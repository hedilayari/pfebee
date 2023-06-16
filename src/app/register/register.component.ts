import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from '../services/auth.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User={email:"",password:""}
  options: AnimationOptions = {    
    path: '/assets/lottie/bee1.json'  
  };
  public errmsg:any
  public success:any
  confirmpass:any
  constructor(private auth :AuthService) { }


  registeradmin(monform:any){
    let data= monform.value
    this.auth.register(data).subscribe((response:any)=>{
      console.log(response.message)
      this.errmsg=response.message
      this.success=response.success
      console.log(this.success);
      
      },err=>{
        console.log(err);
      ;
      
    })
  }
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmpassword');
    if (password!.value !== confirmPassword!.value) {
      confirmPassword!.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword!.setErrors(null);
    }
  }
  ngOnInit(): void {
  }

}
