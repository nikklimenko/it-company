import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LoginResponseType} from "../../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {UserInfoType} from "../../../../types/user-info.type";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[A-ZА-Я][a-zа-я]+\s*$/)]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
    agree: [false, Validators.requiredTrue],
  });
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private _snackbar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  signup(){
    if(this.signupForm.valid && this.signupForm.value.name
      && this.signupForm.value.email && this.signupForm.value.password && this.signupForm.value.agree ){

      this.authService.signup(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password)
        .subscribe({
          next: (data: DefaultResponseType | LoginResponseType) => {
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
            this._snackbar.open('Signup successful');

            const articleUrl = this.activatedRoute.snapshot.queryParams['articleUrl'];
            if (articleUrl) {
              this.router.navigate(['/article/' + articleUrl]);
            } else {
              this.router.navigate(['/']);
            }

          },
          error: (errorResponse: HttpErrorResponse) => {
            if(errorResponse.error && errorResponse.error.message){
              this._snackbar.open(errorResponse.error.message);
            }else {
              this._snackbar.open('Signup Error');
            }
          }
        })
    }
  }

}
