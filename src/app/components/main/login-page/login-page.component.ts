import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  email  = '';
  password = '';
  constructor(private auth : AuthService , private router: Router){ }

  login() {
    if(this.email ==''){
      alert('Please enter Email');
      // return;
    }
    if(this.password ==''){
      alert('Please enter Password');
      // return;
    }
    
    this.auth.login(this.email, this.password);
    localStorage.setItem("Email", this.email);

    this.email = '';
    this.password= '';
    // alert("Succesfull Login!");
  }


}
