import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {}

  async register({ email, password }: { email: string, password: string }): Promise<UserCredential | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (e) {
      return null;
    }
  }
  
  async login({ email, password }: { email: string, password: string }): Promise<UserCredential | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (e) {
      return null;
    }
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }

  async getUser (): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          reject(null);
        }
      });
    });
  }
}
