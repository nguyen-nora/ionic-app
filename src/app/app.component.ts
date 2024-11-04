import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService,
    private menuCtrl: MenuController
  ) {}

  async logout() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    await this.authService.logout();
    await this.menuCtrl.close();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
