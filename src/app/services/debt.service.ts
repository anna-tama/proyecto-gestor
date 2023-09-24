import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Client, Loan } from '../interfaces/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  constructor(private firestore: Firestore) { }

  addLoan(id?: string, newloan?: Loan) {
    const loanDocRef = doc(this.firestore, `clients/${id}`)
    return setDoc(loanDocRef, newloan, { merge: true });
  }

  addLoanToExistingArray(id?: string, newLoan?: Loan[]) {
    let data = {
      loan: newLoan
    };

    const loanDocRef = doc(this.firestore, `clients/${id}`)
    return setDoc(loanDocRef, data, { merge: true });
  }

  updateDebt(id: string, client: Client) {
    console.log('id',id)
    console.log('client',client)

    const loanDocRef = doc(this.firestore, `clients/${id}`)
    return setDoc(loanDocRef, client);
  }

  deleteDebt(id: string, idLoan: string) {
    const clientDocRef = doc(this.firestore, `clients/${id}`)
    return deleteDoc(clientDocRef);
  }

}
