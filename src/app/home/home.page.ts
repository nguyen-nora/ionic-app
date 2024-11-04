import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile! : null;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService
  ) {}

  async logout() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    await this.authService.logout();

    await loading.dismiss();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
