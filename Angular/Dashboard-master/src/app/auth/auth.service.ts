import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token:string
  private type:string
  private id:string

  getToken() {
    // console.log(this.token)
    return this.token;
  }
  getType(){
    return this.type
  }
  getID(){
    return this.id
  }
  constructor(private http: HttpClient,public route: ActivatedRoute, private router:Router) {
   
   }

  login(email: string, password: string) {
    const authData: any = {email: email, password: password};
    // this.token ='t'
   return this.http.post<{token: string , Type:string  , id:number , error:string , fName:string}>("http://localhost:5000/api/user/admin/login", authData)
  }

}

