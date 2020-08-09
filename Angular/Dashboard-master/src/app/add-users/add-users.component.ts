import { Component, OnInit , OnDestroy, Input } from '@angular/core';
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
import { UserCrudService } from "../../services/user-crud.service";
import { User } from '../../models/user'
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  users: User[] = []

  constructor( private formBuilder: FormBuilder,
    private userService: UserCrudService,
    public route: ActivatedRoute,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      FName:new FormControl('',[Validators.required]),
      LName:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(6)]),
      phone:new FormControl('',[Validators.required]),
      type:new FormControl('admin')
    })
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
        this.userService.displayAllUsers()
        .subscribe((users : User[])=>{
          users.forEach(user => {
            if(user.Type == 'admin'){
              this.users.push(user)
            }
          })
          this.userService.adminChanged.emit(this.users)
        }

        )
       
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
  mySubscription: any;

  
}
