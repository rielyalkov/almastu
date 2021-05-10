import {Component} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(
    private snackBar: MatSnackBar,
    private route: Router
  ) { }
  hide = true;

  signIn(usernameRaw: string, password: string): void {
    const username = usernameRaw + '@almastu-dmd.web.app';
    firebase.auth().signInWithEmailAndPassword(username, password).then(() => {
      this.route.navigate(['/']).then();
    })
      .catch((error) => {
        const errorCode = error.code;
        let message = 'неизвестная проблема';
        if (errorCode === 'auth/user-not-found') {
          message = 'пользователь не найден';
        } else if (errorCode === 'auth/wrong-password' && password !== '') {
          message = 'неправильный пароль';
        } else if (errorCode === 'auth/wrong-password' && password === '') {
          message = 'введите пароль в поле!';
        } else if (errorCode === 'auth/invalid-email') {
          message = 'введите имя пользователя в поле!'; }
        this.snackBar.open('Ошибка: ' + message, null, {duration: 5000});
      });
  }

}
