import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private email= new Subject<any>();
  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/home']);
      this.email.next({text:localStorage.getItem('Email')})
    }, err => {
      alert(err.message);
      this.email.next({text:localStorage.setItem('Email','')})
      this.router.navigate(['/login'])
    })
  }

  logout(email: string, password: string) {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      localStorage.setItem("Email", "");
    }, err => {
      alert(err.message);
    })
  }

  updateUser():Observable<any> {
    return  this.email.asObservable();
  }
  
}


