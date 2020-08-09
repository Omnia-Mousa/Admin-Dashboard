import { Component, OnInit , ViewChild, ElementRef  } from '@angular/core';
import * as jsPDF from 'jspdf'
import { NgForm } from '@angular/forms';
import { Order } from '../../models/order'
import { OrderCrudService} from '../../services/order-crud.service'
import { Router} from '@angular/router'


@Component({
  selector: 'app-order-crud',
  templateUrl: './order-crud.component.html',
  styleUrls: ['./order-crud.component.css']
})
export class OrderCrudComponent implements OnInit {
  @ViewChild('htmlData') htmlData:ElementRef;
  @ViewChild('#editProductForm') editForm:NgForm
  
   orders: Order[] = [] 

  constructor(private orderService:OrderCrudService,  private router: Router,) { }

  ngOnInit(): void {
    this.getAllOrders()
  }

  onSubmitEdit(){
    console.log(this.editForm.value)
  }

  public openPDF():void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a3');
    doc.fromHTML(DATA.innerHTML,120,50);
    doc.output('dataurlnewwindow');
  }


  public downloadPDF():void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a3');

    let handleElement = {
      '#bypassme':function(element,renderer){
        return true;
      }
    };
    const margins = {
      top: 50,
      bottom: 60,
      left: 120,
      width: 522
  };
    doc.fromHTML(DATA.innerHTML,
      margins.left,
      margins.top,
      {
      'width': margins.width,
      'elementHandlers': handleElement
    });

    doc.save('angular-demo.pdf');
  }

  getAllOrders(){
    this.orderService.getAllOrders()
    .subscribe((orders: Order[]) =>{
      this.orders = orders;
      console.log(orders)
    }, err => {
      console.log(err)
    })
  }

  getOrderById(order: Order){
    console.log(order);
    // this.router.navigate(["/invoice/{order.id}"])

  }



}
