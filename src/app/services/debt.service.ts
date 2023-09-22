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
    const clientDocRef = doc(this.firestore, `clients/${id}`)
    return setDoc(clientDocRef, newloan, { merge: true });
  }



}
