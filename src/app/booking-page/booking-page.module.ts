import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingPagePageRoutingModule } from './booking-page-routing.module';

import { BookingPagePage } from './booking-page.page';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingPagePageRoutingModule,
  ],
  declarations: [BookingPagePage]
})
export class BookingPagePageModule {}
