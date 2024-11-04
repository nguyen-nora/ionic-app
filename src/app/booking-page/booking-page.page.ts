import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Booking } from '../services/booking.service';
import { BookingDetailPage } from '../booking-detail/booking-detail.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.page.html',
  styleUrls: ['./booking-page.page.scss'],
})
export class BookingPagePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal | any ; 
  userid? : string;
  name?: string;
  description?: string;
  address?: string; 
  phone?: string;
  bookings: Booking[] = [];
  
  constructor(
    private authService:AuthService, 
    private bookingService:BookingService, 
    private toast: ToastController, 
    private modalCtrl: ModalController,
    private router: Router) { 
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('confirm');
    this.addBooking();
  }

  addBooking() {
    this.bookingService.addBooking({userid: "", name: this.name, description: this.description, address: this.address, phone: this.phone}).then(() => {
      this.toast.create({
        message: 'Đã thêm sân',
        duration: 3000
      }).then((toast) => {
        toast.present();
        this.modal.dismiss(null, 'confirm');
      });
    }).catch((error) => {
      this.toast.create({
        message: 'Lỗi thêm sân: ' + error,
        duration: 3000
      }).then((toast) => {
        toast.present();
      });
    });
  }

  async openBooking(booking: Booking) {
    const modal = await this.modalCtrl.create({
      component: BookingDetailPage,
      componentProps: {id: booking.id},
      breakpoints:[0, 0.5, 1],
      initialBreakpoint: 1
    });
    await modal.present();
  }

  ngOnInit() {
    this.authService.getUser().then((user) => {
      this.userid = user.uid;
      this.bookingService.getBookings().subscribe((res => {
        this.bookings = res;
        //console.log(this.bookings);
      }));
      //console.log(this.userid); 
    }).catch((error) => {
      console.log(error);
    });
  }

  async back() {
    this.router.navigate(['/home']);
  }

}
