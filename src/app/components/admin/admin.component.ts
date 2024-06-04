import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TableComponent } from 'src/app/shared/table/table.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  adminInfo: [] = [];

  constructor(private userService: UserService) { }
  ngOnInit() {
    this.getAdminData();
  }

  getAdminData() {
    this.userService.getAdminData().subscribe({
      next: (response) => {
        console.log(response);
        this.adminInfo = response;
      }
    })
  }

}
