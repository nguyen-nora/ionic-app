import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingPagePage } from './booking-page.page';

const routes: Routes = [
  {
    path: '',
    component: BookingPagePage
  },
  /*{
    path: 'home',
    loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'booked',
    loadChildren: () => import('../booked/booked.module').then( m => m.BookedPageModule)
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingPagePageRoutingModule {}
