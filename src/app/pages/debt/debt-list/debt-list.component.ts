import { Component, OnInit } from '@angular/core';
import { Client } from '@app/interfaces/client';
import { ClientService } from '@app/services/client.service';

@Component({
  selector: 'app-debt-list',
  templateUrl: './debt-list.component.html',
  styleUrls: ['./debt-list.component.scss']
})
export class DebtListComponent implements OnInit {

  
  clients: Client[] = [];

  constructor(private clientService: ClientService){

  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clientsFirebase=>{
      this.clients = clientsFirebase;
      console.log('clientsFirebase',clientsFirebase)
    })
  }

  async onClickDelete(client: Client){
    const response = await this.clientService.deleteClient(client);
    console.log('borrado',response)
  }


}
