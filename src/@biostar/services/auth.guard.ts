import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate {

   constructor(
      //private authService: AuthService, 
      private router: Router) {}

   canActivate(
   next: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): boolean | UrlTree {
      let url: string = state.url;

          return this.checkLogin(url);
      }

      checkLogin(url: string): true | UrlTree {
         let val: string = localStorage.getItem('id_token');
         if(val){
            if(url == "/auth/login")
               this.router.parseUrl('/');
            else 
               return true;
         } else {
            return this.router.parseUrl('auth/login');
         }
      }
}