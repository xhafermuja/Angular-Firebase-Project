import { Component } from '@angular/core';
import { doc } from '@firebase/firestore';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  email= '';
  // private sub:Subscription;
  constructor(private auth : AuthService){
    this.email=localStorage.getItem("Email" )?.split('@')[0] || "";
    
     this.auth.updateUser().subscribe(
      (m) =>{
        this.email=m.text.split('@')[0];
      }
    )
  }

  logout(){
    this.auth.logout;
    localStorage.clear();
    if(localStorage.getItem("Email")==null){
      alert("You succesfullu Loget Out!")
    }
    this.email='';
  }

}
