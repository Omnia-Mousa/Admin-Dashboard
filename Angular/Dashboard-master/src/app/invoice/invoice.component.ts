import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order'
import { Product } from '../../models/product'
import { User } from '../../models/user'
import { OrderCrudService} from '../../services/order-crud.service'
import { ProductCrudService} from '../../services/product-crud.service'
import { UserCrudService} from '../../services/user-crud.service'
import { ActivatedRoute, Router} from "@angular/router";
import { Subscription } from 'rxjs';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  today: number = Date.now();
  orderID : number = 0 ;
  ownerId : string = ""
  amountArray : string = "";
  amount = []
  productarray : string = "";
  produtcs : Product[] = []
  order : Order = {
    id : 0,
    orderId:0,
    sourceAddress:"",
    destinationAddress:"",
    status:"",
    amount:"",
    // arrivalTime:Date.now(),
    totalPrice:0,
    productOwnerID:"",
    userId:0,
    productId:"",
  }

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

  client:User ={
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
  constructor(
    private orderService:OrderCrudService,
    private productService:ProductCrudService,
    private userService:UserCrudService,
    private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderID = params['id'];
      console.log(this.orderID) //log the value of id
    });

    this.getOrder();
    // this.getStore();
  }

  getOrder(){
    this.orderService.getOrderById(this.orderID)
    .subscribe((order: Order) => {
      this.order = order[0];
      this.getAmount()
      this.getProduct()
      this.getStore()
      this.getClient()
    },err => {
      console.log(err)
    })
  }

  getStore(){
    this.ownerId = this.order.productOwnerID[0]
    this.userService.getOwnerById(+this.ownerId)
    .subscribe((user : User) => {
      // console.log(user)
      this.myproduct.user = user[0]
      console.log(this.myproduct.user)
    },err => {
      console.log(err)
    })
  }

  getClient(){
    this.userService.getOwnerById(this.order.userId)
    .subscribe((user : User)=> {
      this.client = user[0];
      console.log(this.client)
    },err => {
      console.log(err)
    })
  }

  getAmount(){
    this.amountArray = this.order.amount
    this.amountArray.split('-').forEach(amount => {
        this.amount.push(+amount)
    })
    console.log(this.amount)
  }

  getProduct(){
    this.productarray = this.order.productId
    this.productarray.split('-').forEach(product => {
      // console.log(+product)
      this.productService.getProductById(+product)
      .subscribe((product : Product)=> {
        this.produtcs.push(product)
      })
    })
    console.log(this.produtcs)
  }

  

}
