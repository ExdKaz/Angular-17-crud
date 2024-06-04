import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['firstName', 'lastName', 'dob', 'email', 'password', 'role'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.getAdminData();
  }

  getAdminData() {
    this.userService.getAdminData().subscribe({
      next: (response) => {
        this.data = response;
        this.dataSource.data = this.data;
      }
    })
  }

}
