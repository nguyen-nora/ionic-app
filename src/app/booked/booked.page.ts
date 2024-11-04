import { Component, OnInit } from '@angular/core';
import { Booked, BookedService } from '../services/booked.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.page.html',
  styleUrls: ['./booked.page.scss'],
})
export class BookedPage implements OnInit {
  userid: any;
  bookeds: Booked[] = [];

  constructor(private authService: AuthService, private bookedService: BookedService, private router: Router, private toast: ToastController) { }

  ngOnInit() {
    this.authService.getUser().then((user) => {
      this.userid = user.uid;
      this.bookedService.getBooked(this.userid).subscribe(res => {
        this.bookeds = res;
      });
    } ).catch((error) => {
      console.log(error);
    });
  }

  async back(){
    this.router.navigate(['/home']);
  }

  async deleteBooked(booked: Booked) {
    this.bookedService.removeBooked(booked.id).then(() => {
      this.toast.create({
        message: 'Xoá sân đặt thành công',
        duration: 3000
      }).then((toast) => {
        toast.present();
      });
    }).catch((error) => {
      this.toast.create({
        message: 'Lỗi xoá sân đã đặt: ' + error,
        duration: 3000
      }).then((toast) => {
        toast.present();
      });
    });
  } 
}
