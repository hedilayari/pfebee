import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  msg:any;

  constructor(private auth:AuthService , private router:Router) { }
  user: User = {email:"",password:""};
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token!=undefined) {
      this.router.navigate(['/dashboard']);
    }
    else{
      this.router.navigate(['/login']);

    }
  }
  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  options: AnimationOptions = {
    path: '/assets/lottie/bee1.json'
  };

  login(monform: any) {
    let data = monform.value;
    this.auth.login(data).subscribe(
      (response: any) => {
        console.log(response);
        this.auth.saveToken(response.token);
        this.msg = response.message;
        console.log(this.msg);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
