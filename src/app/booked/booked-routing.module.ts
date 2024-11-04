import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookedPage } from './booked.page';

const routes: Routes = [
  {
    path: '',
    component: BookedPage
  },
  /*{
    path: 'home',
    loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'booking-page',
    loadChildren: () => import('../booking-page/booking-page.module').then( m => m.BookingPagePageModule)
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookedPageRoutingModule {}
