import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {UserInfoType} from "../../../../types/user-info.type";
import {Subject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  userName: string = '';


  constructor(private authService: AuthService,
              private _snackbar: MatSnackBar,
              private router: Router) {
    this.isLogged = this.authService.getIsLoggedIn();
    // this.authService.getUserName().subscribe(userName => this.userName = userName);
  }

  ngOnInit() {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

    this.authService.getUserInfo().subscribe((userData: DefaultResponseType | UserInfoType) => {
      if((userData as DefaultResponseType).error !== undefined){
        throw new Error((userData as DefaultResponseType).message);
      }
      this.userName = (userData as UserInfoType).name;

    })

    this.authService.userName$.subscribe(userName => {
      this.userName = userName;
    });


  }

  logout() {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      })
  }

  doLogout() {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackbar.open('Logout successful');
    this.router.navigate(['/']);
  }

}
