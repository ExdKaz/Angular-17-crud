import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { TableComponent } from 'src/app/shared/table/table.component';
import { DatePipePipe } from '../pipes/date-pipe.pipe';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TableComponent, CommonModule, DatePipePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'dob', 'email', 'password', 'role', 'edit', 'delete'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  constructor(private userService: UserService, private datePipe: DatePipePipe) { }
  ngOnInit() {
    this.getAdminData();
  }

  getAdminData() {
    this.userService.getAdminData().subscribe({
      next: (response) => {
        this.data = response;
        this.data.map((item) => {
          item.dob = this.datePipe.transform(item.dob)
        })
        this.dataSource.data = this.data;
      }
    })
  }

}
