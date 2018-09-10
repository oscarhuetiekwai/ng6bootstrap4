import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router:Router,
    private authService: AuthService
  ) { }

  canActivate(){
    let user = this.authService.currentUser;
    if(user && user.user_role == 1){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
