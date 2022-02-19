import { Pipe, PipeTransform } from '@angular/core';
import {Status} from "../../../shared/configuration";

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
    return '';
  }

}
