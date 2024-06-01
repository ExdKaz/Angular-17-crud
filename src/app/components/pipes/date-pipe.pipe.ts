import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe',
  standalone: true
})
export class DatePipePipe implements PipeTransform {

  transform(date: any): string {
    const parsedDate = new Date(date);
    const day = this.padZero(parsedDate.getUTCDate());
    const month = this.padZero(parsedDate.getUTCMonth() + 1);
    const year = parsedDate.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

}
