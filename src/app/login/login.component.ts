import { Component } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getApp } from '@angular/fire/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  auth = getAuth(getApp());

  constructor(
    private snackBar: MatSnackBar,
    private route: Router
  ) {
  }

  hide = true;

  signIn(usernameRaw: string, password: string): void {
    const username = usernameRaw + '@almastu-dmd.web.app';
    signInWithEmailAndPassword(this.auth, username, password).then(() => {
      this.route.navigate(['/panel']).then();
    })
      .catch((error) => {
        const errorCode = error.code;
        let message;
        switch (errorCode) {
          case 'auth/wrong-password': {
            if (password !== '') {
              message = 'неправильный пароль';
            } else {
              message = 'введите пароль в поле!';
            }
            break;
          }
          case 'auth/user-not-found': {
            message = 'пользователь не найден';
            break;
          }
          case 'auth/invalid-email': {
            message = 'введите имя пользователя в поле!';
            break;
          }
          default: {
            message = errorCode;
            break;
          }
        }
        this.snackBar.open('Ошибка: ' + message, null, {duration: 5000});
      });
  }
}
