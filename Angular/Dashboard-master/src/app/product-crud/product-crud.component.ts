import { Component, OnInit , ViewChild} from '@angular/core';
import { Product } from '../../models/product';
import { ProductCrudService } from '../../services/product-crud.service';
import {FormBuilder, NgForm}from '@angular/forms';
import { UserCrudService } from '../../services/user-crud.service'
import { User } from 'src/models/user';

// import { ModalService } from 'modal-service';
// import {ModalContainerComponent} from '@angular/m'


@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('editProductForm') editForm: NgForm;

  products: Product[] = [];
  rating: number = 0;
  myproduct : Product = {
    id : 0,
    title:"",
    price:0,
    imageUrl:"",
    description:"",
    status:"",
    amount:0,
    category:"",
    rate:0,
    userId:0,
    user:{
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
    }
  };

  // user : User = {
  //   id : 0,
  //   Type:"",
  //   fName:"",
  //   lName:"",
  //   shopName:"",
  //   email:"",
  //   password:"",
  //   status:"",
  //   address:"",
  //   gender:"",
  //   phone:0,
  //   DOB:"",
  // };

  constructor(private productService: ProductCrudService, 
              private fb: FormBuilder,
              private userService:UserCrudService) { }
  
  async ngOnInit(){
    // this.products = await this.productService.displayAllProducts()
    this.getAllProducts()
  }

  onSubmitProduct(data){
    this.productService.addProduct(null,data.title, data.price, data.imageUrl , data.description , data.status ,data.amount , data.category , data.rate , data.userId,data.user)
    .subscribe(()=> {
      // this.modalService.onModalDismiss
      this.getAllProducts();
      console.log("Product added")
    }, (err)=>{
      console.log(err)
    })
  }

  onSave(){
    this.closebutton.nativeElement.click();
  }

  getAllProducts() {
    this.productService.getAllProducts()
      .subscribe((products: Product[]) => {
        this.products = products;
        console.log(this.products);
        // console.log(products.length);
      }, (err) => {
        console.log(err)
      }
      )
  }

  

  deleteProduct(product : Product){
    this.productService.deleteProduct(product.id)
    .subscribe(()=> {
      this.getAllProducts();
      console.log("Product Deleted")
    }, (err)=>{
      console.log(err)
    })
  }

  getProductById(product : Product){
      this.myproduct = product;
    // this.userService.getStoreName(this.myproduct.userId)
    // .subscribe((user : User) =>{
    //   this.user.fName = user.fName,
    //   this.user.lName = user.lName
    // }, err =>{
    //   console.log(err)
    // })

    this.editForm.form.patchValue({
      id : this.myproduct.id,
      title : this.myproduct.title,
      price : this.myproduct.price,
      imageUrl : this.myproduct.imageUrl,
      description : this.myproduct.description,
      status  : this.myproduct.status,
      amount : this.myproduct.amount,
      category : this.myproduct.category,
      rate : this.myproduct.rate
    });
  }


  onSubmitEdit(){
    this.myproduct.id = this.editForm.value.id;
    this.myproduct.title = this.editForm.value.title;
    this.myproduct.price = this.editForm.value.price;
    this.myproduct.imageUrl = this.editForm.value.imageUrl;
    this.myproduct.description = this.editForm.value.description;
    // this.myproduct.status = this.editForm.value.status;
    this.myproduct.amount = this.editForm.value.amount;
    this.myproduct.category = this.editForm.value.category;
    this.myproduct.rate = this.editForm.value.rate;
    

    console.log(this.myproduct);
    
    this.productService.edidProduct(
      this.myproduct.id,
      this.myproduct
    )
      .subscribe(()=> {
        this.getAllProducts();
        console.log("Product Editted")
      }, (err)=>{
        console.log(err)
      })

  }


  editStatus(product:Product){
    this.myproduct = product;
    if(this.myproduct.status == 'active'){
      this.myproduct.status = 'inactive'
    }else{
      this.myproduct.status = 'active'
    }
    this.productService.editProductStatus(
      this.myproduct.id,
      this.myproduct
    )
    .subscribe(()=> {
      this.getAllProducts();
          console.log("Status Editted")
        }, (err)=>{
          console.log(err)
        })

  }

//   onChange(product: Product , isChecked: boolean){
//     // this.myproduct = product;
//     // console.log(this.myproduct)
//     // let Status = "";
//     // if(isChecked){
//     //   Status = "active"
//     // }else{
//     //   Status = "inactive"
//     // }
//     // console.log("after checked" , Status)
//     // this.myproduct.status = Status;
//     // console.log("after this.myprodut.status = " , this.myproduct.status)

//     this.myproduct.id = product.id;
//     this.myproduct.title = product.title;
//     this.myproduct.price = product.price;
//     this.myproduct.imageUrl = product.imageUrl;
//     this.myproduct.description = product.description;
//     this.myproduct.status = product.status;
//     this.myproduct.amount = product.amount;
//     this.myproduct.category = product.category;
//     this.myproduct.rate = product.rate;


//     // this.myproduct = product;
//     if(isChecked){
//       this.myproduct.status = "active"
//     }else{
//       this.myproduct.status = "inactive"
//     }
//     console.log(this.myproduct.status)
//     this.productService.edidProduct(
//         this.myproduct.id,
//         this.myproduct
//       )
//         .subscribe(()=> {
//           // this.getAllProducts();
//           console.log("edited" , this.myproduct)
//         }, (err)=>{
//           console.log(err)
//         })
//   }
}
