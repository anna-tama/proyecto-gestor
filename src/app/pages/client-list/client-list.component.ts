import { Component, OnInit } from '@angular/core';
import { Client } from '@app/interfaces/client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit{

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
