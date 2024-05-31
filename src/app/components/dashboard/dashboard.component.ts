import { Component, DoCheck, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, DoCheck {

  isRegistered = signal(false);
  isLoggedIn = signal(false);
  details: any;
  role: any;
  userDetails: any
  isLoggedOut: boolean = true;
  isMenuRequired: boolean = false;

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    if (this.isLoggedOut === false) {
      this.sharedService.isLoggedIn.set(false);
      this.sharedService.isRegistered.set(false);
      sessionStorage.removeItem('authenticated');
      sessionStorage.removeItem('userInfo');
      this.role = '';
    } else {
      this.isRegistered = this.sharedService.isRegistered;
      this.isLoggedIn = this.sharedService.isLoggedIn;
      this.details = sessionStorage.getItem('userInfo');
      this.userDetails = JSON.parse(this.details);
      this.role = this.userDetails?.role;
    }

  }

  logout() {
    this.isLoggedOut = false;

    this.ngOnInit();
  }

  ngDoCheck() {
    let currentUrl = this.router.url;
    console.log(currentUrl);

    if (currentUrl == '/login') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
  }

}
