import { Pipe, PipeTransform } from '@angular/core';
import { ListsService } from '../services/lists.service';
import { ColorService } from '../services/color.service';

@Pipe({
  name: 'getStatus'
})
export class GetStatusPipe implements PipeTransform {

  constructor(private listsService: ListsService) { }

  transform(value: string): any {

    let result = '';

    this.listsService.status.forEach( element => {

      if (element.value === value) {
        result = element.label;
      }

    });

    return result;
  }

}
