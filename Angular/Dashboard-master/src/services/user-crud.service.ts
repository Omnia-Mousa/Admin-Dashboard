import { Injectable , EventEmitter } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  adminChanged = new EventEmitter<User[]>()

  constructor(private myHttp:HttpClient) { }

  baseUrl:string = "http://localhost:5000/api/user/";
  homeUrl:string = "http://localhost:5000/api/home/owner"
  addUserUrl:string = "http://localhost:5000/api/user/register";

  displayAllUsers(){
    return this.myHttp.get(this.baseUrl,{observe:'body'});
  }

  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  addUser(fName:string, lName:string , email:string , password:string , phone:string, Type:string)
  {
    const user = { fName: fName,lName:lName, email: email , password:password ,phone:phone  ,Type:Type};
    console.log(user)
    return this.myHttp.post<{message: string }>(this.addUserUrl, user)
   }

  deleteUser(id){
    return this.myHttp.delete(`${this.baseUrl}/profile/delete/${id}` , {headers :new HttpHeaders().set("authorization",this.currentUser.token )} )
  }

  editUserStatus(id:number , user : User){
    return this.myHttp.patch(`${this.baseUrl}/status/update/${id}` , user ,{headers :new HttpHeaders().set("authorization",this.currentUser.token )} )
  }

  getOwnerById(id: number){
    return this.myHttp.get(`${this.homeUrl}/${id}` , {observe:"body"} );
  }
}
