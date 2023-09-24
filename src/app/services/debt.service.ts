import { Injectable } from '@angular/core';
import { Firestore, setDoc, } from '@angular/fire/firestore';
import { Client, Loan } from '../interfaces/client';

import { doc, updateDoc, deleteField } from "firebase/firestore";

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

  async deleteDebt(id: string, idLoan: string) {
    console.log('id',id)
    const clientDocRef = doc(this.firestore, `clients/${id}`)
    await updateDoc(clientDocRef, {
      loan: deleteField()
  });
  }

}
