import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  isRegistered = signal(false);
  isLoggedIn = signal(false);


  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.isRegistered = this.sharedService.isRegistered;
    this.isLoggedIn = this.sharedService.isLoggedIn;
  }


}
