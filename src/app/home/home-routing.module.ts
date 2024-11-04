import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'booking-page',
    loadChildren: () => import('../booking-page/booking-page.module').then( m => m.BookingPagePageModule)
  },
  {
    path: 'booked',
    loadChildren: () => import('../booked/booked.module').then( m => m.BookedPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
