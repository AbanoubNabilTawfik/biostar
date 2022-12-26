import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import * as jwt_decode from "jwt-decode";
import { HttpService } from "./http.service";
import { AccountController } from "../APIs/authController";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AuthService {
  user: any;

  // logged in user
  public loggedInUser$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // loadingAction
  public loadingAction$: BehaviorSubject<Boolean> =
    new BehaviorSubject<Boolean>(false);

  constructor(
    private router: Router,
    //private HttpService: HttpService,
    private http: HttpClient
  ) {
   /* this.user = JSON.parse(localStorage.getItem("app_user"));
    if (this.user != null) {
      this.loggedInUser$.next(this.user);
      this.loadingAction$.next(false);
    }*/
  }

  // store user data after login succeffully
  updateStoredUserInfo(userData) {
    let user = JSON.parse(localStorage.getItem("app_user"));
    user.firstName = userData && userData.firstName ? userData.firstName : null;
    user.lastName = userData && userData.lastName ? userData.lastName : null;
    user.phoneNumber =
      userData && userData.phoneNumber ? userData.phoneNumber : null;
    if (userData.personalImagePath) {
      user.personalImagePath = userData.personalImagePath;
    }
    localStorage.setItem("app_user", JSON.stringify(user));

    this.loggedInUser$.next(user);
  }

  updateStoredUserRoles(roles: string[]) {
    let user = JSON.parse(localStorage.getItem("app_user"));
    user.userRoles = roles;
    localStorage.setItem("app_user", JSON.stringify(user));
    this.loggedInUser$.next(user);
  }

  refreshToken(token: string) {
    let user = JSON.parse(localStorage.getItem("app_user"));
    
    user.token = "Bearer " + token;
    localStorage.setItem("app_user", JSON.stringify(user));
    this.loggedInUser$.next(user);
  }

  // store user data after login succeffully
  storeUserDate(user) {
    // local storage store only string, so need to convert json data to string
    // JSON.parse(user), to return user to an normal object
    user.is_token_expired = false;
    user.token = "Bearer " + user.token;
    localStorage.setItem("app_user", JSON.stringify(user));

    this.loggedInUser$.next(JSON.parse(localStorage.getItem("app_user")));
  }

  // load the data
  loadToken() {
    if (
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("app_user")).token
    ) {
      this.user = JSON.parse(localStorage.getItem("app_user"));
    }
  }

  // check the role
  roleMatch(allowedRoles: string[]): boolean {
    if (!localStorage.getItem("app_user")) {
      this.router.navigate(["/auth/login"]);
      return false;
    }

    let isMatch = false;
    let userRoles: string[] = JSON.parse(
      localStorage.getItem("app_user")
    ).userRoles;
    allowedRoles.forEach((elem) => {
      if (userRoles.indexOf(elem) > -1) {
        isMatch = true;
        return false;
      }
    });

    return isMatch;
  }

  // loading action
  ActionLoading(val: boolean) {
    this.loadingAction$.next(Boolean(val));
  }

  login(model: any) {
    const app_user = JSON.parse(localStorage.getItem('app_user'));
    const id_token = JSON.parse(localStorage.getItem('id_token'));
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('rejectUnauthorized', 'false');

    if (id_token) {
      headers = headers.append('Authorization', id_token);
    }

    return this.http.post(AccountController.login, model);
  }

  Register(model: any) {
    const user = JSON.parse(localStorage.getItem('app_user'));
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('rejectUnauthorized', 'false');

    // if (user && user.token) {
    //   headers = headers.append('Authorization', user.token);
    // }
console.log(model);

    return this.http.post(AccountController.Register, model);
  }

  logout() {
    localStorage.removeItem("id_token");
    //localStorage.removeItem("expires_at");
  }
  /*
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
  
  isLoggedOut() {
      return !this.isLoggedIn();
  }
  
  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  } */
}
