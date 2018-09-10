import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;
 
  ngOnInit() {
  }
  invalidLogin: boolean; 

  constructor(
    private router: Router, 
    private authService: AuthService) { }

  signIn(credentials) {
    this.authService.login(credentials)
      .subscribe(result => { 
        console.log(result);
        if (result){
          this.router.navigate(['/']);
        }else{
          this.invalidLogin = true; 
        }
      },
      (error) => {
        this.error = error;
        this.invalidLogin = true; 
      });
  }

}
