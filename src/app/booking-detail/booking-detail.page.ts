import { Component, OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Booking } from '../services/booking.service';
import { ModalController, ToastController } from '@ionic/angular';
import { BookedService } from '../services/booked.service';
import { IonModal } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.page.html',
  styleUrls: ['./booking-detail.page.scss'],
})
export class BookingDetailPage implements OnInit {
@ViewChild(IonModal) modal: IonModal | any ; 
@Input() id! :string;
  booking! : Booking;
  bookedDate: string = new Date().toISOString();
  constructor(private bookingService: BookingService, private toast:ToastController, private modalCtrl: ModalController, private bookedService: BookedService, private router: Router,) { }

  ngOnInit() {
    //console.log(this.id);
    this.bookingService.getBookingById(this.id).subscribe(res => {
      this.booking = res
    });
  }

  async editBooking() {
    this.bookingService.editBooking(this.booking).then(() => {
      this.toast.create({
        message: 'Cập nhật sân thành công',
        duration: 3000
      }).then((toast) => {
        toast.present();
      });
    }).catch((error) => {
      this.toast.create({
        message: 'Lỗi cập nhật sân: ' + error,
        duration: 3000
      }).then((toast) => {
        toast.present();
        this.modalCtrl.dismiss();
      });
    });
  }

  async removeBooking() {
    this.bookingService.removeBooking(this.booking.id).then(() => {
      this.toast.create({
        message: 'Xoá sân thành công',
        duration: 3000 
      }).then((toast) => {
        toast.present();
        this.modalCtrl.dismiss();
      });
    }).catch((error) => {
      this.toast.create({
        message: 'Lỗi xoá sân: ' + error,
        duration: 3000
      }).then((toast) => {
        toast.present();
        this.modalCtrl.dismiss();
      });
    });
  }

  async addBooked() {
    this.bookedService.addBooked({userid: "", bookingName: this.booking.name, idBooking: this.booking.id, bookedDate: this.bookedDate}).then(() => {
      this.toast.create({
        message: 'Đã đặt sân thành công',
        duration: 3000
      }).then((toast) => {
        toast.present();
        this.modalCtrl.dismiss();
      })
      console.log(this.booking.name);
    }).catch((error) => {
      this.toast.create({
        message: 'Lỗi đặt sân: ' + error,
        duration: 3000
      }).then((toast) => {
        toast.present();
        this.modalCtrl.dismiss();
      });
    });
  }

  showCalendar() {
    this.modal.showCalendar = true;
  }
  cancelCalendar() {
    this.modal.showCalendar = false;
  }
  confirmCalendar() {
    this.modal.showCalendar = false;
  }

  async gotoBooking() {
    this.router.navigateByUrl('/booking-page', { replaceUrl: true });
  }

  async gotoBooked() {
    this.router.navigateByUrl('/booked', { replaceUrl: true });
  }

  onDateChange(event: any) {
    this.bookedDate = event.detail.value;
  }
}
