import { Component, OnInit } from '@angular/core';
import 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'myproject';

  LoginSuccessfully : boolean = false;
 
  
  constructor() {}
  
  ngOnInit() {

  }

  receiveSignIn(e){
    console.log(e)
    this.LoginSuccessfully = e.login;
  }

 

}
