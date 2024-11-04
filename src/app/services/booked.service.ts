import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { collection, doc, deleteDoc, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Firestore, addDoc, collectionData } from '@angular/fire/firestore';

export class Booked{
  userid? : string;
  id? : string;
  idBooking?: string;
  bookedDate?: string;
  bookingName?: string;
  constructor(userid: string, idBooking: string, bookingName: string, bookedDate: string) {
    this.userid = userid;
    this.idBooking = idBooking;
    this.bookingName = bookingName;
    this.bookedDate = bookedDate;
  }
}

@Injectable({
  providedIn: 'root'
})

export class BookedService {
  userid: any;
  constructor(private authService:AuthService, private firestore: Firestore) { 
    this.authService.getUser().then((user) => {
      this.userid = user.uid;
    }).catch((error) => {
      console.log(error);
    } );
  }

  addBooked(booked: Booked) {
    booked.userid = this.userid;
    const bookedRef = collection(this.firestore, 'booked');
    return addDoc(bookedRef, booked);
  }

  getBooked(id : any): Observable<Booked[]> {
    const bookedRef = collection(this.firestore, 'booked');
    const queryRef = query(bookedRef, where('userid', '==', id));
    return collectionData(queryRef, { idField: 'id' }) as Observable<Booked[]>;
  }

  removeBooked(id: any) {
    const bookedRef = doc(this.firestore, `booked/${id}`);
    return deleteDoc(bookedRef);
  }
}


