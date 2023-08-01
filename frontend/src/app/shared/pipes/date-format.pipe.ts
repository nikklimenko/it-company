import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    const dateObject = new Date(value);

    const addLeadingZero = (num: number): string => (num < 10 ? `0${num}` : num.toString());

    const day = addLeadingZero(dateObject.getDate());
    const month = addLeadingZero(dateObject.getMonth() + 1);
    const year = dateObject.getFullYear();
    const hours = addLeadingZero(dateObject.getHours());
    const minutes = addLeadingZero(dateObject.getMinutes());

    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

    return formattedDate;
  }

}
