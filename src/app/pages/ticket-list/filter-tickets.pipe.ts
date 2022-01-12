import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTickets'
})
export class FilterTicketsPipe implements PipeTransform {

  transform(value: any[], args): unknown {
    return value.filter((e) => !!e.session);
  }

}
