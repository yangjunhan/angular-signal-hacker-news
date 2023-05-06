import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'domain',
  standalone: true
})
export class DomainPipe implements PipeTransform {
  transform(url: string): string {
    let hostname;
    if (url) {
      if (url.indexOf('://') > -1) {
        hostname = url.split('/')[2];
      } else {
        hostname = url.split('/')[0];
      }
      return hostname.split(':')[0].split('?')[0];
    }
    return '';
  }
}
