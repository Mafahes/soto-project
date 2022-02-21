import { Pipe, PipeTransform } from '@angular/core';
import {Status} from "../configuration";

@Pipe({
  name: 'brigadeTableHelper'
})
export class BrigadeTableHelperPipe implements PipeTransform {

  transform(value: any, args: string): unknown {
    if (args === 'drivers') {
      return value.map(e => `${e.user.secondName} ${e.user.firstName.slice(0, 1) || '-'}. ${e.user.patronymic.slice(0, 1) || '-'}.`);
    }
    if (args === 'status') {
      return Status.brigadeStatus.find((e) => e.value === value).label || '-';
    }
    if (args === 'order') {
      return Status.orderStatus[value];
    }
    if (args === 'findByState2') {
      return value.find((e) => e.orderInHistory.state === 2)?.dateAdd ?? '';
    }
    if (args === 'findByState3') {
      return value.find((e) => e.orderInHistory.state === 3)?.dateAdd ?? '';
    }
    if (args === 'findByState4') {
      return value.find((e) => e.orderInHistory.state === 4)?.dateAdd ?? '';
    }
    return '';
  }

}
