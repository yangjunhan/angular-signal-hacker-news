import { Pipe, PipeTransform } from '@angular/core';

import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'readableTime',
  standalone: true
})
export class ReadableTimePipe implements PipeTransform {
  transform(timespan: number): string {
    const date = new Date(1000 * timespan);
    return `${formatDistanceToNow(date)} ago`;
  }
}
