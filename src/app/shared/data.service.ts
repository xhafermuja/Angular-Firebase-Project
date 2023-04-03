import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  addClient(client : Client){
    client.id = this.afs.createId();
    return this.afs.collection('/Clients/').add(client);
  }

  getAllClients(){
    return this.afs.collection('/Clients').snapshotChanges();
  }

  deleteClient(client: Client){
    return this.afs.doc('/Clients/' + client.id).delete();
  }

  updateClient(client:Client){
    this.deleteClient(client);
    this.addClient(client);
  }

  
}
