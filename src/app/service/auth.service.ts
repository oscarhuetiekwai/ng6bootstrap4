import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map, catchError } from 'rxjs/operators';
import { throwError } from '../../../node_modules/rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  //login function
  login(credentials: any) { 
    return this.http.post(environment.apiurl + 'auth', credentials,httpOptions)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if(user){
          localStorage.setItem('token',JSON.stringify(user));
        }
        return true;
      }),catchError(this.handleError));
  }
 
  //logout
  logout() { 
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
 
  // check if logged
  isLoggedIn() { 
    return tokenNotExpired();
    /*let jwtHelper = new JwtHelper();
    let token = localStorage.getItem('token');

    if(!token) return false;

    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);

    return !isExpired;*/
  }

  // get logged user
  get currentUser(){
    let token = localStorage.getItem('token');
    if(!token) return null;

    return new JwtHelper().decodeToken(token);
  }

  //handle error and return to browser
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error);
  };
}
