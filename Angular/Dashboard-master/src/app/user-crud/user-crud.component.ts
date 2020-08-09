import { Component, OnInit } from '@angular/core';
import { UserCrudService } from '../../services/user-crud.service';
import { User } from '../../models/user'
import { TableUtil } from '../tableUtil'

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fName', 'lName', 'role', 'email', 'gender'];
  users: User[]  = [];
  user: User = {
    id: 0,
    Type: "",
    fName: "",
    lName: "",
    shopName: "",
    email: "",
    password: "",
    status: "",
    address: "",
    gender: "",
    phone: 0,
    DOB: "",
  };
  Type: boolean = false;

  // dataSource = ELEMENT_DATA;

  constructor(private userService: UserCrudService) { }



  ngOnInit(): void {
    this.getAllUsers();
  }

  exportTable() {
    TableUtil.exportToExcel("ExampleTable");
  }
  
  getAllUsers() {
    this.userService.displayAllUsers()
      .subscribe((users: User[]) => {
        this.users = users
        // users.forEach(myuser => {
        //   if(myuser.Type == 'shop' || myuser.Type == 'user'){
        //     this.Type = true
        //     this.users.push(myuser);
        //   }
        // })
      }, (err) => {
        console.log(err)
      }
      )
  }

  getUserById(user: User) {
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
    // console.log(this.user);
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id)
      .subscribe(() => {
        this.getAllUsers()
        console.log("User Deleted")
      }, (err) => {
        console.log(err)
      })
  }

  editStatus(user : User){
    this.user = user;
    if(this.user.status == 'active'){
      this.user.status = 'inactive'
    }else{
      this.user.status = 'active'
    }
    this.userService.editUserStatus(
      this.user.id,
      this.user
    )
    .subscribe(()=> {
      console.log("updated")
    } , err => {
      console.log(err)
    })
  }

}
