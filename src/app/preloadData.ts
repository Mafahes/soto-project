import {Injectable} from '@angular/core';
import {ApiService} from './shared/services/api.service';
import {StorageService} from './shared/injectables/storage.service';

@Injectable()
export class PreloadProvider {


  constructor(
    private api: ApiService,
    private storage: StorageService
  ) {

  }

  load(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!!localStorage.getItem('api_token')) {
        try {
          const user = await this.api.getSelf().toPromise();
          this.storage.setData('user', user);
        } catch (e) {

        }
      }
      this.storage.setData('mode', (localStorage.getItem('mode') || false).toString() === 'true');
      resolve(true);
    });
  }
}
