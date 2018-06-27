import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shared'
})
export class SharedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
