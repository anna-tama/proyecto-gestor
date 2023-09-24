import { Component, OnInit } from '@angular/core';
import { Client } from '@app/interfaces/client';
import { ClientService } from '@app/services/client.service';
import { DebtService } from '@app/services/debt.service';

@Component({
  selector: 'app-debt-list',
  templateUrl: './debt-list.component.html',
  styleUrls: ['./debt-list.component.scss']
})
export class DebtListComponent implements OnInit {

  
  clients: Client[] = [];

  constructor(
    private clientService: ClientService,
    private debtService: DebtService
    ){ }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clientsFirebase=>{
      this.clients = clientsFirebase;
      console.log('clientsFirebase',clientsFirebase)
    })
  }

  async onClickDelete(idClient: string, idLoan: string){
    const response = await this.debtService.deleteDebt(idClient,idLoan);
  }


}
