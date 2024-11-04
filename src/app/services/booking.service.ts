import { Injectable, Input } from '@angular/core';
import { AuthService } from './auth.service';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { Firestore, addDoc, collectionData, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export class Booking {
  userid?: string;
  id?: string;
  name?: string;
  description?: string;
  address?: string; 
  phone?: string;
  
  constructor(userid: string, name: string, description: string, address: string, phone: string) {
    this.userid = userid; 
    this.name = name;
    this.description = description;
    this.address = address;
    this.phone = phone;
  } 
}

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  userid: any;
  constructor(private authService:AuthService, private firestore: Firestore) { 
    this.authService.getUser().then((user) => {
      this.userid = user.uid;
    }).catch((error) => {
      console.log(error);
    } );
  }

  addBooking(booking: Booking) {
    booking.userid = this.userid;
    const bookingRef = collection(this.firestore, 'bookings');
    return addDoc(bookingRef, booking);
  }

  getBookings(): Observable<Booking[]> {
    const bookingsRef = collection(this.firestore, 'bookings');
    return collectionData(bookingsRef, { idField: 'id' }) as Observable<Booking[]>;
  }

  getBookingById(id: string): Observable<Booking> {
    const bookingRef = doc(this.firestore, `bookings/${id}`);
    return docData(bookingRef, { idField: 'id' }) as Observable<Booking>;
  }

  editBooking(booking: Booking) {
    const bookingRef = doc(this.firestore, `bookings/${booking.id}`);
    return updateDoc(bookingRef, { name: booking.name, description: booking.description, address: booking.address, phone: booking.phone });
  }

  removeBooking(id: any) {
    const bookingRef = doc(this.firestore, `bookings/${id}`);
    return deleteDoc(bookingRef);
  }

}