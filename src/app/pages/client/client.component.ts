import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client, Loan } from '@app/interfaces/client';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-clients',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  profileForm: FormGroup | undefined;
  submitted: boolean = false;
  loading: boolean = false;
  id: string | null | undefined;
  clients: Client[] = [];
  client: Client | undefined;
  title: string = 'Agregar Cliente';


  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initProfileForm();
    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.shouldEdit()
  }

  initProfileForm() {
    this.profileForm = this.fb!.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
    })
  }

  onSubmit() {
    this.loading = true;
    this.submitted = true;

    if (this.profileForm!.invalid) return;

    if (this.id === null) {
      this.addClient()
    } else {
      this.updateClient(this.id!)
    }


  }

  async addClient() {
    const client: Client = {
      firstName: this.profileForm?.value.firstName,
      lastName: this.profileForm?.value.lastName,
      mobile: this.profileForm?.value.mobile,
      address: this.profileForm?.value.address,
    }
    const response = await this.clientService.addClient(client).then(() => {
      this.loading = false;
      this.toastr.success('El cliente fue registrado con éxito', 'Cliente registrado', { positionClass: 'toast-bottom-right' });
      this.submitted = false;
      this.profileForm?.reset();
    }).catch(error => {
      this.loading = false;
      this.toastr.error('Ha ocurrido un error', 'Cliente sin registrar', { positionClass: 'toast-bottom-right' });
      console.log(error)
    });
  }


  shouldEdit() {
    if (this.id !== null) {
      this.loading = true;
      this.title = 'Editar cliente';
      this.clientService.getClients().subscribe(clientsFirebase => {
        this.loading = false;
        this.client = clientsFirebase.find(miembro => miembro.id == this.id)
        console.log('shouldEdit this.client', this.client)
        this.profileForm?.setValue({
          firstName: this.client!.firstName,
          lastName: this.client!.lastName,
          mobile: this.client!.mobile,
          address: this.client!.address,
        })
      })
    }
  }

  updateClient(id: string) {
    const client: Client = {
      firstName: this.profileForm?.value.firstName,
      lastName: this.profileForm?.value.lastName,
      mobile: this.profileForm?.value.mobile,
      address: this.profileForm?.value.address,
    }

    this.loading = true;

    this.clientService.updateClient(id, client).then(() => {
      this.loading = false;
      this.toastr.info('El empleado fue modificado con éxito', 'Empleado modificado', { positionClass: 'toast-bottom-right' })
    })
    this.router.navigate(['/client-list'])
  }

}
