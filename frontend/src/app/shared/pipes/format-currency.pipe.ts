import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {

  transform(value: number): string | null{
    if(value.toString().length > 3){
      let cleaned = ('' + value.toString()).replace(/\D/g, '');
      let match = cleaned.match(/^([0-9]{1})([0-9]{3})/);
      console.log(match);
      if(match){
        let res =  match[1] + " " + match[2];
        return res;
      }
    }else {
      return value.toString();
    }
    return null;
  }
}
