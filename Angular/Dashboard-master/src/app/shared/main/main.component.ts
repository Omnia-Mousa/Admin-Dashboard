import { Component, OnInit } from '@angular/core';
import { ProductCrudService } from '../../../services/product-crud.service'
import { UserCrudService } from '../../../services/user-crud.service'
import { OrderCrudService } from '../../../services/order-crud.service'
import { Product } from '../../../models/product'
import { User } from '../../../models/user'
import { Order } from '../../../models/order'
import { OrderCrudComponent } from 'src/app/order-crud/order-crud.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  products : Product[]
  users: User[] = []
  stores: User[] = []
  orders : Order []

  constructor(private productService:ProductCrudService,
              private userService:UserCrudService,
              private orderService:OrderCrudService) { }

  async ngOnInit(){
    this.productService.getAllProducts().subscribe((products: Product[])=>{
      this.products = products
    }, err =>{
      console.log(err)
    })
    
    this.userService.displayAllUsers()
    .subscribe((users : User[])=> {
      users.forEach(myuser => {
        if(myuser.Type == 'shop'){
          this.stores.push(myuser)
        }else if(myuser.Type == 'user')
        {
          this.users.push(myuser)
        }
      })
    }, err => {
      console.log(err)
    })

    this.orderService.getAllOrders().subscribe((orders : Order[])=> {
      this.orders = orders
    }, err => {
      console.log(err)
    })
  }
  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}

