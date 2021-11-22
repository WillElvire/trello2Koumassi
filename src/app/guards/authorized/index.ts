import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import {Router }from '@angular/router';

import { CredentialsService } from 'src/app/services/auth/credentials.service';
@Injectable({
  providedIn: 'root'
})
export class Authorized  {

 user :any;

 constructor(private credentials:CredentialsService,private router: Router){

 }
 canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  this.user = this.credentials.getUser();

  if(!this.user.type_id) {

    this.router.navigate(['/scanner']);
  }
  return true;
}



}
