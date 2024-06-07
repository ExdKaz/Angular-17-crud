import { Component, OnInit } from '@angular/core';
import { DatePipePipe } from '../pipes/date-pipe.pipe';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { TableComponent } from 'src/app/shared/table/table.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DatePipePipe, CommonModule, MaterialModule, TableComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'dob', 'email', 'password', 'role', 'edit', 'delete'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  constructor(private datePipe: DatePipePipe, private userService: UserService) {

  }


  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserData().subscribe({
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
