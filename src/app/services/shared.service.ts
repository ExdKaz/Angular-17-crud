import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  userInfo: any;

  constructor() { }
  info: any;
  isRegistered = signal(false);
  isLoggedIn = signal(false);

  isAuthenticated(): boolean {
    return sessionStorage.getItem('authenticated') != null;
  }

  isAdmin(): boolean {
    this.info = sessionStorage.getItem('userInfo');
    if (this.info) {
      this.userInfo = JSON.parse(this.info);
      return this.userInfo.role === 'admin';
    }
    return false;
  }
}
