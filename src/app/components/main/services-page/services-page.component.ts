import { Component } from '@angular/core';
import { Client } from 'src/app/model/client';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent {
  clientList : Client[] =[];
  clientObj : Client ={
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    package: '',
  }
  id= '';
  first_name = '';
  last_name ='';
  email =''; 
  mobile = '';
  package = '';

  constructor(private data: DataService , private auth : AuthService){
    this.getAllStudent();
  }
  

  getAllStudent(){
    this.data.getAllClients().subscribe(res => {
      this.clientList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert(err.message);
    } );
  }

  resetForm(){
    this.id ='';
    this.first_name='';
    this.last_name='';
    this.email='';
    this.mobile='';
    this.package='';
  }

  addClient(){
    if(localStorage.getItem('Email')!=null){
      this.package = (document.getElementById('package') as HTMLSelectElement).value;
      
      if(this.first_name =='' || this.last_name=='' || this.email=='' || this.mobile=='' || this.package==''){
        alert("Fill all the infos!!");
        return;
      }
      this.clientObj.id ='';
      this.clientObj.first_name= this.first_name;
      this.clientObj.last_name= this.last_name;
      this.clientObj.email = this.email;
      this.clientObj.mobile = this.mobile;
      this.clientObj.package= this.package;

      this.data.addClient(this.clientObj);
      this.resetForm();
    }else{
      alert('You are not Logged IN!!');
    }
  }

  updateClient(){

  }

  deleteClient(client: Client){
    if(window.confirm('Are you Sure you want to  delete ' +client.first_name+' ' +client.last_name+ ' ?')){
      this.data.deleteClient(client);
    }
  }
  

}
