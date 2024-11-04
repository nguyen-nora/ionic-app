import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }


  async register() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const userCredential = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if (userCredential) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Registration failed',
        message: 'Please try again',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

    async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const userCredential = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if (userCredential) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Login failed',
        message: 'Please try again',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}