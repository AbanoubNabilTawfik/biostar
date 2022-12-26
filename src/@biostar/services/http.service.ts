import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
// services

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';



@Injectable({ providedIn: 'root' })
export class HttpService {
  user: any;
  loggedInUser$: any;
  loadingAction$: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    //private authService: AuthService
  ) {
    this.user = JSON.parse(localStorage.getItem("app_user"));
    if (this.user != null) {
      // this.loggedInUser$.next(this.user);
      //this.loadingAction$.next(false);
    }
  }


  setTokenExpiriation(isExpire: boolean) {
    const user = JSON.parse(localStorage.getItem('app_user'));
    user.is_token_expired = isExpire;
    localStorage.setItem('app_user', JSON.stringify(user));
    this.router.navigate(['/auth/lock-screen']);
  }
  prepareRequestHeaders2(containFiles: boolean = false, isExternal: boolean = false) {
    let headers: HttpHeaders = new HttpHeaders();

    if (!isExternal) {

      if (containFiles) {
        headers = headers.append('Accept', 'application/json');
      } else {
        headers = headers.append('Content-Type', 'application/json');
      }

    }

    const user = JSON.parse(localStorage.getItem('app_user'));

    const id_token = JSON.parse(localStorage.getItem('id_token'));
    if (user && id_token && !isExternal) {
      headers = headers.append('Authorization', 'Bearer ' + id_token);
    }

    return headers;
  }

  prepareRequestHeaders(containFiles: boolean = false) {
    let headers: HttpHeaders = new HttpHeaders();

    if (containFiles) {
      headers.append('Accept', 'application/json');
    } else {
      headers.append('Content-Type', 'application/json');
    }
    const id_token = JSON.parse(localStorage.getItem('id_token'));
    const user = JSON.parse(localStorage.getItem('app_user'));
    if (user && id_token) {
      headers.append('Authorization', 'Bearer ' + id_token);
    }

    return headers;
  }


  ReturnParameterizedUrl(params: any[]): HttpParams {

    // params
    let httpParams: HttpParams = new HttpParams();
    if (!params) {
      return httpParams;
    }
    params.forEach(res => {
      if (res.value) {

        if (Array.isArray(res.value)) { // Incase you pass array of Ids 
          let arr = res.value as string[];
          httpParams = httpParams.append(res.key, JSON.stringify(arr.join(',')));
        } else if (typeof res.value == 'object') {
          Object.keys(res.value).forEach(k => {
            httpParams = httpParams.append(k, res.value[k]);
          })
          // url = url + `&&${key}=` + new Date(this.filterDto[key]).toISOString();
        } else {
          httpParams = httpParams.append(res.key, res.value);
        }

      }
    })

    return httpParams;

  }

  // GET request
  GET(url: string, params: any[] = []) {

    // params
    let httpParams: HttpParams;//= this.ReturnParameterizedUrl(params);
    const id_token = JSON.parse(localStorage.getItem('id_token'));
    // headers
    const user = JSON.parse(localStorage.getItem('app_user'));
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    //if (user && id_token) {
    if (id_token) {
      headers = headers.append('Authorization', 'Bearer ' + id_token);
    }

    return this.http.get(url, { observe: 'response', params: httpParams, headers })
      .pipe(
        catchError(err => {
          if (err.status <= 400 || err.status === 500) {
            const errSTR = JSON.stringify(err);
            const errJSON = JSON.parse(errSTR);
            return throwError(errJSON._body);
          } else if (err.status === 401) { // 401 (not authorized)
            user && id_token ? this.setTokenExpiriation(true) : this.logout();
            this.router.navigate(['/auth/login']);
          } else if (err.status === 403) { // 403 (Forbidden)
            this.router.navigate(['/errors/error-403']);
          }
        }),
        map(res => res.body as any)
      );

  }


  // POST request
  POST(url: string, body: any = null, params: any[] = [], containFiles: boolean = false) {

    // params
    let httpParams: HttpParams = this.ReturnParameterizedUrl(params);

    // headers
    const id_token = JSON.parse(localStorage.getItem('id_token'));
    const user = JSON.parse(localStorage.getItem('app_user'));
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(`${containFiles ? 'Accept' : 'Content-Type'}`, 'application/json');
    if (user && id_token) {
      headers = headers.append('Authorization', 'Bearer ' + id_token);
    }

    return this.http.post(url, body, { observe: 'response', params: httpParams, headers })
      .pipe(
        catchError(err => {
          if (err.status <= 400 || err.status === 500) {
            const errSTR = JSON.stringify(err);
            const errJSON = JSON.parse(errSTR);
            return throwError(errJSON._body);
          } else if (err.status === 401) { // 401 (not authorized)
            user && id_token ? this.setTokenExpiriation(true) : this.logout();
            this.router.navigate(['/auth/login']);
          } else if (err.status === 403) { // 403 (Forbidden)
            this.router.navigate(['/errors/error-403']);
          }
        }),
        map(res => res.body as any)
      );

  }

  // PUT request
  PUT(url: string, body: any = null, params: any[] = [], containFiles: boolean = false) {

    // params
    let httpParams: HttpParams = this.ReturnParameterizedUrl(params);

    // headers
    const id_token = JSON.parse(localStorage.getItem('id_token'));
    const user = JSON.parse(localStorage.getItem('app_user'));
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(`${containFiles ? 'Accept' : 'Content-Type'}`, 'application/json');
    if (user && id_token) {
      headers = headers.append('Authorization', 'Bearer ' + id_token);
    }

    return this.http.put(url, body, { observe: 'response', params: httpParams, headers })
      .pipe(
        catchError(err => {
          if (err.status <= 400 || err.status === 500) {
            const errSTR = JSON.stringify(err);
            const errJSON = JSON.parse(errSTR);
            return throwError(errJSON._body);
          } else if (err.status === 401) { // 401 (not authorized)
            user && id_token ? this.setTokenExpiriation(true) : this.logout();
            this.router.navigate(['/auth/login']);
          } else if (err.status === 403) { // 403 (Forbidden)
            this.router.navigate(['/errors/error-403']);
          }
        }),
        map(res => res.body as any)
      );

  }


  // DELETE request
  DELETE(url: string, params: any[] = []) {

    // params
    let httpParams: HttpParams = this.ReturnParameterizedUrl(params);

    // headers
    const user = JSON.parse(localStorage.getItem('app_user'));
    const id_token = JSON.parse(localStorage.getItem('id_token'));
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    if (user && id_token) {
      headers = headers.append('Authorization', 'Bearer ' + id_token);
    }

    return this.http.delete(url, { observe: 'response', params: httpParams, headers })
      .pipe(
        catchError(err => {
          if (err.status <= 400 || err.status === 500) {
            const errSTR = JSON.stringify(err);
            const errJSON = JSON.parse(errSTR);
            return throwError(errJSON._body);
          } else if (err.status === 401) { // 401 (not authorized)
            user && id_token ? this.setTokenExpiriation(true) : this.logout();
            this.router.navigate(['/auth/login']);
          } else if (err.status === 403) { // 403 (Forbidden)
            this.router.navigate(['/errors/error-403']);
          }
        }),
        map(res => res.body as any)
      );

  }


  // Get Location info
  async GetCurrentTime() {

    // const url = 'https://api.timezonedb.com/v2.1/get-time-zone?key=YTCIS5WPHW5Z&format=json&by=zone&zone=Africa/Cairo';
    // const url = 'http://worldtimeapi.org/api/ip';
    const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=pSSiY171tKcI8iyd-a81k_uWZGfziedpnhiXCCHb1McSFbwIC7_nrN6PjJYwJo2wCuDAbz_DmyBUh8tAoWWa2a1w-awrV3xcm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ9GRkcRevgjTvo8Dc32iw_BLJPcPfRdVKhJT5HNzQuXEeN3QFwl2n0M6ZmO-h7C6eIqWsDnSrEd&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk';

    let time: number;
    const res = await this.http.get(url).toPromise();
    if (res) {
      const time = res;
    }
    return time;
  }

  ExportToExcel(url: string) {

    const user = JSON.parse(localStorage.getItem('app_user'));
    const id_token = JSON.parse(localStorage.getItem('id_token'));
    return this.http.post(url, '', { headers: this.prepareRequestHeaders(), responseType: 'blob' })
      .pipe(
        catchError(err => {
          if (err.status <= 400 || err.status === 500) {
            // return _throw(new Error(String(err.status) + ' ' + err.statusText));
            const errSTR = JSON.stringify(err);
            const errJSON = JSON.parse(errSTR);
            return throwError(errJSON._body);
          } else if (err.status === 401) { // 401 (not authorized)
            user && id_token ? this.setTokenExpiriation(true) : this.logout();
            this.router.navigate(['/auth/login']);
          } else if (err.status === 403) { // 403 (Forbidden)
            this.router.navigate(['/demo1/security/forbidden-page']);
          }
        })
      );
  }

  // logout
  logout() {
    this.user = null;
    localStorage.clear();
    //localStorage.removeItem("app_user");
    localStorage.removeItem("id_token");
    //localStorage.removeItem("locationDto");
    this.router.navigate(["/auth/login"]);
  }


}
