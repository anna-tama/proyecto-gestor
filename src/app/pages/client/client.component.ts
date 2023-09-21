import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '@app/interfaces/client';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-clients',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  profileForm: FormGroup | undefined;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initProfileForm();
  }

  initProfileForm() {
    this.profileForm = this.fb!.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
    })
  }

  async onSubmit() {
    console.log('this.profileForm!.invalid', this.profileForm!.invalid)
    this.loading = true;
    this.submitted = true;

    if (this.profileForm!.invalid) return;

    const client: Client = {
      firstName: this.profileForm?.value.firstName,
      lastName: this.profileForm?.value.lastName,
      mobile: this.profileForm?.value.mobile,
      address: this.profileForm?.value.address,
    }
    console.log('client', client)
    const response = await this.clientService.addClient(client).then(() => {
      this.loading = false;
      this.toastr.success('El cliente fue registrado con éxito', 'Cliente registrado', { positionClass: 'toast-bottom-right' });
      this.submitted = false;
      this.profileForm?.reset();
      console.log('reseteo submitted', this.submitted)
    }).catch(error => {
      this.loading = false;
      this.toastr.error('Ha ocurrido un error', 'Cliente sin registrar', { positionClass: 'toast-bottom-right' });
      console.log(error)
    });
  }

}
