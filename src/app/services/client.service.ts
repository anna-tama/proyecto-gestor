import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Client } from '../interfaces/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firestore: Firestore) { }

  addClient(client: Client) {
    const clientRef = collection(this.firestore, 'clients');
    return addDoc(clientRef, client);
  }

  getClients():Observable<Client[]>{
    const clientRef = collection(this.firestore, 'clients');
    return collectionData(clientRef, {idField: 'id'}) as Observable<Client[]>;
  }

  deletePlace(client: Client){
    const clientDocRef = doc(this.firestore, `clients/${client.id}`)
    return deleteDoc(clientDocRef);
  }


}
