import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LoginResponseType} from "../../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserInfoType} from "../../../../types/user-info.type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private _snackbar: MatSnackBar,
              private router: Router) {
  }


  login() {
    if(this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password){
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, !!this.loginForm.value.rememberMe)
        .subscribe({
          next: (data: LoginResponseType | DefaultResponseType) => {
            let error = null;
            if((data as DefaultResponseType).error !== undefined){
              error = (data as DefaultResponseType).message;
            }

            const loginResponse = data as LoginResponseType;

            if(!loginResponse.accessToken || !loginResponse.refreshToken || !loginResponse.userId ){
              error = 'Authorisation Error';
            }

            if(error) {
              this._snackbar.open(error);
              throw new Error(error);
            }

            this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
            this.authService.userId = loginResponse.userId;
            this.authService.getUserInfo().subscribe(data => {
              this.authService.updateUserName((data as UserInfoType).name);
            });
            this._snackbar.open('Authorization successful');
            this.router.navigate(['/']);

          },
          error: (errorResponse: HttpErrorResponse) => {
            if(errorResponse.error && errorResponse.error.message){
              this._snackbar.open(errorResponse.error.message);
            }else {
              this._snackbar.open('Authorisation Error');
            }
          }
        })
    }
  }

}
