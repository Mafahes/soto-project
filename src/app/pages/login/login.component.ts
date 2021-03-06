import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ApiService} from '../../shared/services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {CodeInputComponent} from 'angular-code-input';
import {AppComponent} from "../../app.component";
import { StorageService } from '../../shared/injectables/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    login: [null, Validators.required],
    password: [null, Validators.required]
  });
  loading = false;
  constructor(
    private fb: FormBuilder,
    private app: AppComponent,
    private router: Router,
    private api: ApiService,
    private storage: StorageService,
    private snackBar: MatSnackBar) { }
  ngOnInit(): void {
  }
  async submitLogin(code = null): Promise<void> {
    this.loading = true;
    this.api.logIn(this.form.value).subscribe(async (e) => {
      localStorage.setItem('api_token', e.text);
      var a = await this.api.getSelf().toPromise();
      this.loading = false;
      if (a.roleName !== 'Администратор' && a.roleName !== 'Менеджер' && a.roleName !== 'Диспетчер') {
        localStorage.removeItem('api_token');
        return;
      }
      this.storage.setData('user', a);
      this.router.navigate(['/dispatcher/brigade']);
      // await this.app.parseUser();
      // let a = await this.app.getSessions();
      // if (a.length > 0) {
      //   this.router.navigate(['/room/session/' + a[0].roomId]);
      // } else {
      //   this.router.navigate(['/room/list']);
      // }
    }, (e) => {
      this.loading = false;
      this.snackBar.open('Данные не подходят', 'OK', {
        duration: 1000
      });
      this.form.reset();
      console.log(e);
    });
  }
}
