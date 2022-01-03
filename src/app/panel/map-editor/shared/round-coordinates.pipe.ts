import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundCoordinates'
})
export class RoundCoordinatesPipe implements PipeTransform {
  round(value): number {
    return Math.round(value * 100) / 100;
  }

  transform(value: [number, number, any?]): string {
    return `[${this.round(value[0])}, ${this.round(value[1])}]`;
  }
}
