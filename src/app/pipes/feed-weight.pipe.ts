import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'feedWeight'
})
export class FeedWeightPipe implements PipeTransform {

  transform(value: number): string {
    if (value <= 500) {
      return value.toFixed() + ' г';
    } else if(value < 1000){
      return (+value.toFixed()/Math.pow(10,+value.toFixed().length)).toFixed(2) + ' кг'
    } else {
      return (+value.toFixed()/Math.pow(10,+value.toFixed().length)-1).toFixed(2) + ' кг'
    }
  }
}
