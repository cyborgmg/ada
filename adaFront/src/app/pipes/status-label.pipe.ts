import { Pipe, PipeTransform } from '@angular/core';
import { ListsService } from '../services/lists.service';

@Pipe({
  name: 'statusLabel'
})
export class StatusLabelPipe implements PipeTransform {

  constructor(private listsService: ListsService) {}

  transform(value: string): string {

    let result = '';

    this.listsService.status.forEach( element => {

      if (element.value === value) {
        result = element.label;
      }

    });

    return result;
  }

}
