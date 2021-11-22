import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import {Router }from '@angular/router';

import { CredentialsService } from 'src/app/services/auth/credentials.service';
@Injectable({
  providedIn: 'root'
})
export class AccessGuardGuard  {

 constructor(private credential :CredentialsService,private router: Router){

 }

 canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  if(this.credential.getUser() == null  ){

    this.router.navigate(['login']);

  }
  return true;
}



}
