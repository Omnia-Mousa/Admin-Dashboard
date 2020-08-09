import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserCrudService } from '../../services/user-crud.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm
} from "@angular/forms";
import {
  NgbModalConfig,
  NgbModal,
  NgbActiveModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  users: User[] = [];
  user : User = {
    id : 0,
    Type:"",
    fName:"",
    lName:"",
    shopName:"",
    email:"",
    password:"",
    status:"",
    address:"",
    gender:"",
    phone:0,
    DOB:"",
  };
  Type: boolean = false;


  constructor(private userService: UserCrudService,
    public route: ActivatedRoute,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    // this.userService.adminChanged.subscribe((users : User[])=>{
    //   this.users = users
    // }, err => {
    //   console.log(err)
    // })
    this.registerForm = new FormGroup({
      FName:new FormControl('',[Validators.required]),
      LName:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(6)]),
      phone:new FormControl('',[Validators.required]),
      type:new FormControl('admin')
    })
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.displayAllUsers()
      .subscribe((users: User[]) => {
        this.users = users
      }, (err) => {
        console.log(err)
      }
      )
  }
  id;
  message;
  content;
  onAddUser(form) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    return this.userService
      .addUser(
        this.registerForm.value.FName,
        this.registerForm.value.LName,
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.phone,
        this.registerForm.value.type,
      )
      .subscribe(res => {
        this.getAllUsers()
        // this.userService.displayAllUsers()
        // .subscribe((users : User[])=>{
        //   users.forEach(user => {
        //     if(user.Type == 'admin'){
        //       this.users.push(user)
        //     }
        //   })
        //   this.userService.adminChanged.emit(this.users)
        // }

        // )
       
      });
  }

  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }

  getUserById(user : User){
    this.user.id = user.id;
    this.user.Type = user.Type;
    this.user.lName = user.lName;
    this.user.fName = user.fName;
    this.user.shopName = user.shopName;
    this.user.email = user.email;
    this.user.password = user.password;
    this.user.status = user.status;
    this.user.address = user.address;
    this.user.gender = user.gender;
    this.user.phone = user.phone;
    this.user.DOB = user.DOB;
    console.log(this.user);
  }

  
  deleteUser(user){
    this.userService.deleteUser(user.id)
    .subscribe(()=> {
      this.getAllUsers();
      console.log("User Deleted")
    }, (err)=>{
      console.log(err)
    })
  }

}
