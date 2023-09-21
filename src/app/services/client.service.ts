import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, setDoc } from '@angular/fire/firestore';
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

  deleteClient(client: Client){
    const clientDocRef = doc(this.firestore, `clients/${client.id}`)
    return deleteDoc(clientDocRef);
  }

  getClient(id: string){
    return doc(this.firestore, `clients/${id}`);
  }

  updateClient(id:string, client: Client){
    const clientDocRef = doc(this.firestore, `clients/${id}`)
    return setDoc(clientDocRef,client);
  }


}
