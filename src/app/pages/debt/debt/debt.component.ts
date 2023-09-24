import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Client, Loan } from '@app/interfaces/client';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DebtService } from '@app/services/debt.service';
import { ClientService } from '@app/services/client.service';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.scss']
})
export class DebtComponent implements OnInit {
  debtForm: FormGroup | undefined;
  submitted: boolean = false;
  loading: boolean = false;
  id: string | null | undefined;
  idLoan: string | null | undefined;
  clients: Client[] = [];
  client: Client | undefined;
  clientSelected: Client | undefined;
  title: string = 'Agregar Préstamo';
  getClientsArray: Client[] = [];

  constructor(
    private debtService: DebtService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initdebtForm();
    this.id = this.aRoute.snapshot.paramMap.get('idClient');
    this.idLoan = this.aRoute.snapshot.paramMap.get('idLoan');
    this.getClients();
    this.shouldEdit()
  }

  initdebtForm() {
    this.debtForm = this.fb!.group({
      clientId: ['', Validators.required],
      initialDate: ['', Validators.required],
      totalAmount: ['', Validators.required],
      profit: ['', Validators.required],
      cuoteType: ['', Validators.required],
      cuoteQuantity: ['', Validators.required],
      cuotePaid: ['', Validators.required],
      cuoteValue: ['', Validators.required],
    })
  }

  onSubmit() {
    this.loading = true;
    this.submitted = true;

    if (this.debtForm!.invalid) return;

    if (this.id === null) {
      this.addLoan()
    } else {
      this.updateLoan()
    }
  }

  getClients() {
    this.clientService.getClients().subscribe(clientsFirebase => {
      this.getClientsArray = clientsFirebase
      console.log(clientsFirebase)
    })
  }


  shouldEdit() {
    if (this.id !== null) {
      this.loading = true;
      this.title = 'Editar Préstamo';
      this.clientService.getClients().subscribe(clientsFirebase => {
        this.loading = false;
        this.client = clientsFirebase.find(miembro => miembro.id == this.id)
        var loan = this.client?.loan!.find(loan => loan.id == this.idLoan)

        this.debtForm?.setValue({
          clientId: loan!.id,
          initialDate: loan!.initialDate,
          totalAmount: loan!.totalAmount,
          profit: loan!.profit,
          cuoteType: loan!.cuoteType,
          cuoteQuantity: loan!.cuoteQuantity,
          cuotePaid: loan!.cuotePaid,
          cuoteValue: loan!.cuoteValue,
        })
      })
    }
  }

  addLoan() {
    this.clientSelected = this.getClientsArray.find(client => client.id == this.debtForm?.value.clientId)

    if (this.clientSelected?.loan?.length) {
      this.addLoanToExistingArray()
    } else {
      const loanClient: Client = {
        loan: [
          {
            id: '1',
            initialDate: this.debtForm?.value.initialDate,
            totalAmount: this.debtForm?.value.totalAmount,
            profit: this.debtForm?.value.profit,
            cuoteType: this.debtForm?.value.cuoteType,
            cuoteQuantity: this.debtForm?.value.cuoteQuantity,
            cuotePaid: this.debtForm?.value.cuotePaid,
            cuoteValue: this.debtForm?.value.cuoteValue,
          }
        ]
      }
      this.debtService.addLoan(this.debtForm?.value.clientId, loanClient).then(() => {
        this.loading = false;
        this.toastr.success('El préstamo fue registrado con éxito', 'Préstamo registrado', { positionClass: 'toast-bottom-right' });
        this.submitted = false;
        this.debtForm?.reset();
      }).catch(error => {
        this.loading = false;
        this.toastr.error('Ha ocurrido un error', 'Préstamo sin registrar', { positionClass: 'toast-bottom-right' });
        console.log(error)
      });
    }
  }

  updateLoan() {
    this.loading = true;
    this.clientSelected = this.getClientsArray.find(client => client.id == this.id)
    let loanToUpdate = this.clientSelected!.loan!.find(loan => loan.id == this.idLoan)

    loanToUpdate!.initialDate! = this.debtForm?.value.initialDate
    loanToUpdate!.totalAmount! = this.debtForm?.value.totalAmount
    loanToUpdate!.profit! = this.debtForm?.value.profit
    loanToUpdate!.cuoteType! = this.debtForm?.value.cuoteType
    loanToUpdate!.cuoteQuantity! = this.debtForm?.value.cuoteQuantity
    loanToUpdate!.cuotePaid! = this.debtForm?.value.cuotePaid
    loanToUpdate!.cuoteValue! = this.debtForm?.value.cuoteValue

   this.debtService.updateDebt(this.id!, this.clientSelected!)
    .then(() => {
      this.loading = false;
      this.toastr.info('El préstamo fue modificado con éxito', 'Préstamo modificado', { positionClass: 'toast-bottom-right' })
      this.router.navigate(['/debt-list'])
    })
  }


  addLoanToExistingArray() {
    this.loading = true;
    var lengthLoan = this.clientSelected?.loan?.length;

    const newLoan: Loan =
    {
      id: (++lengthLoan!).toString(),
      initialDate: this.debtForm?.value.initialDate,
      totalAmount: this.debtForm?.value.totalAmount,
      profit: this.debtForm?.value.profit,
      cuoteType: this.debtForm?.value.cuoteType,
      cuoteQuantity: this.debtForm?.value.cuoteQuantity,
      cuotePaid: this.debtForm?.value.cuotePaid,
      cuoteValue: this.debtForm?.value.cuoteValue,
    }

    this.clientSelected?.loan!.push(newLoan!)

    this.debtService.addLoanToExistingArray(this.debtForm?.value.clientId, this.clientSelected?.loan!)
      .then(() => {
        this.loading = false;
        this.toastr.info('El préstamo fue registrado con éxito', 'Préstamo registrado', { positionClass: 'toast-bottom-right' })
        this.router.navigate(['/debt-list'])
      })

  }

}
