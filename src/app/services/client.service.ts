import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Client, Loan } from '../interfaces/client';
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

  getClients(): Observable<Client[]> {
    const clientRef = collection(this.firestore, 'clients');
    return collectionData(clientRef, { idField: 'id' }) as Observable<Client[]>;
  }

  deleteClient(client: Client) {
    const clientDocRef = doc(this.firestore, `clients/${client.id}`)
    return deleteDoc(clientDocRef);
  }

  getClient(id: string) {
    return doc(this.firestore, `clients/${id}`);
  }

  updateClient(id: string, client: Client) {
    const clientDocRef = doc(this.firestore, `clients/${id}`)
    return setDoc(clientDocRef, client);
  }

  addLoan(id?: string, loana?: Loan) {
    const d = new Date();
    let day = d.getDate();

    let nuevo: Loan = {
      initialDate: '1',
      totalAmount: '1',
      profit: '1',
      cuoteType: '1',
      cuoteQuantity: '1',
      cuotePaid: '1',
      cuoteValue: '1'
    }

    let data = {
      loan: nuevo
    };
    
    const clientDocRef = doc(this.firestore, `clients/${id}`)
    return setDoc(clientDocRef, data, { merge: true });
  }



  updateLoan(id?: string, loana?: Loan) {
    const d = new Date();
    let day = d.getDate();

    let loanita: Loan []= [{
      initialDate: '2',
      totalAmount: '2',
      profit: '2',
      cuoteType: '2',
      cuoteQuantity: '2',
      cuotePaid: '2',
      cuoteValue: '2'
    },
    {
      initialDate: '2',
      totalAmount: '2',
      profit: '2',
      cuoteType: '2',
      cuoteQuantity: '2',
      cuotePaid: '2',
      cuoteValue: '2'
    }]

    let nuevo: Loan = {
      initialDate: '1',
      totalAmount: '1',
      profit: '1',
      cuoteType: '1',
      cuoteQuantity: '1',
      cuotePaid: '1',
      cuoteValue: '1'
    }

    loanita.push(nuevo)

    let data = {
      loan: loanita
    };


    const clientDocRef = doc(this.firestore, `clients/${id}`)
    return setDoc(clientDocRef, data, { merge: true });


  }


}
