import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberRound'
})
export class NumberRoundPipe implements PipeTransform {

  transform(value: number): string {
    return value.toFixed() + ' ккал';
  }

}
