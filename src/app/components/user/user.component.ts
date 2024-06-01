import { Component, OnInit } from '@angular/core';
import { DatePipePipe } from '../pipes/date-pipe.pipe';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DatePipePipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  dat: string = '';

  constructor(private datePipe: DatePipePipe) {

  }
  da: string = '1999-03-12T18:30:00.000Z';

  ngOnInit() {
    this.dat = this.datePipe.transform(this.da)
  }

}
