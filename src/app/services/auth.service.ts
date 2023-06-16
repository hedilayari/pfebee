import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient , private router: Router) { }
  register(user:User){
    return this.http.post('http://localhost:3000/user/register',user)
  }



  login(user: any) {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['dash']);

    }
    else{
      this.router.navigate(['login']);

    }
    return this.http.post('http://localhost:3000/user/login', user);
  }

  saveToken(token: any) {
    if (token !== undefined) {
      localStorage.setItem('token', token);
      this.router.navigate(['dashboard']);
      this.isLoggedIn
    } 
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
    this.isLoggedIn
    
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return authToken !== null ? true : false;
  }
}
