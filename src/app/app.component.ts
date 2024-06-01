import { Component, DoCheck, signal } from '@angular/core';
import { SharedService } from './services/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'Angular-17 CRUD';

  isRegistered = signal(false);
  isLoggedIn = signal(false);
  details: any;
  role: any;
  userDetails: any
  isLoggedOut: boolean = true;
  isMenuRequired: boolean = false;

  constructor(private sharedService: SharedService, private router: Router) { }

  logout() {
    this.isLoggedOut = false;
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('userInfo');
    this.role = '';
  }
  ngDoCheck() {
    if (sessionStorage.getItem('userInfo') != null) {
      this.sharedService.isLoggedIn.set(true);
      this.sharedService.isRegistered.set(true);
    } else {
      this.sharedService.isLoggedIn.set(false);
      this.sharedService.isRegistered.set(false);
    }
    this.isRegistered = this.sharedService.isRegistered;
    this.isLoggedIn = this.sharedService.isLoggedIn;
    this.details = sessionStorage.getItem('userInfo');
    this.userDetails = JSON.parse(this.details);
    this.role = this.userDetails?.role;
    let currentUrl = this.router.url;
    if (currentUrl == '/login' || currentUrl == '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
  }

}
