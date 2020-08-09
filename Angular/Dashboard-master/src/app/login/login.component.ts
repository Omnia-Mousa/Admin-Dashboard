import { Component, OnInit, OnDestroy, Input , EventEmitter ,Output} from "@angular/core";
import { AuthService } from "../../app/auth/auth.service";
// import {NgbdModalContent} from "../register/register.component"
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  NgForm
} from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import {
  NgbModalConfig,
  NgbModal,
  NgbActiveModal
} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
//   @ViewChild('loginForm') loginForm: NgForm;


//  token;
  @Output('sendSuccessLogin') MyEvent = new EventEmitter<any>();
//   constructor(private authService:AuthService , private router:Router) { }

//   ngOnInit(): void {
//   }

//   SendSignIn(){
//       console.log("login success");
//       this.MyEvent.emit({
//         login:true
//       });
//       return this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(result => {
//         console.log(result.Type);
//         localStorage.setItem("currentUser",JSON.stringify({token: result.token, id : result.id , Type: result.Type}) )
//         this.router.navigate(["/dashboard"]);
//       });
//   }

  loginForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }
  token;
  message;
  mySubscription: any;
  onLogin(form) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
   return this.authService
      .login(form.value.email, form.value.password)
      .subscribe(res => {
        this.message = res.error
        console.log(this.message)
     //  alert(this.message)
        if (res.token == null) {
         this.open()
          return;
        }
        this.token = res.token;
        if(this.token != null){
          console.log("login success");
          this.MyEvent.emit({
            login:true
          });
        }
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            token: res.token,
            Type: res.Type,
            id: res.id,
            fName:res.fName
          })
        );
        this.router.navigate(["/dashboard"])
        console.log(this.token)
      
      });
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
  }
  open() {
    // // const modalRef = this.modalService.open(NgbdModalContent);
    // modalRef.componentInstance.message = this.message;
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
