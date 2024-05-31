import { Component, OnInit, signal } from '@angular/core';
import { SharedService } from './services/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-17 CRUD';

  isRegistered = signal(false);
  isLoggedIn = signal(false);
  details: any;
  role: any;
  userDetails: any
  isLoggedOut: boolean = true;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    if (this.isLoggedOut === false) {
      this.sharedService.isLoggedIn.set(false);
      this.sharedService.isRegistered.set(false);
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

}
