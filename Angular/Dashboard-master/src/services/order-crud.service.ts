import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/models/product';
import { User } from 'src/models/user';
import { Order } from 'src/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderCrudService {
  orders: Order[];

  constructor(private myHttp: HttpClient) { }

  baseUrl: string = "http://localhost:5000/api/order";

  getAllOrders(){
    return this.myHttp.get(this.baseUrl , {observe:"body"})
  }

  getOrderById(id: number){
    return this.myHttp.get(`${this.baseUrl}/${id}`, { observe: "body" })
  }

  deleteOrder(id : number) {
    return this.myHttp.delete(`${this.baseUrl}/${id}`, { observe: "body" })
  }

  addOrder(id: number, orderId : number ,sourceAddress: string, destinationAddress: string, status: string, amount: string,totalPrice: number, productOwnerID: string, userId:number , productId:string ) {
    const order: Order = { id: id, orderId: orderId ,sourceAddress: sourceAddress, destinationAddress: destinationAddress, status: status, amount: amount,totalPrice: totalPrice, productOwnerID: productOwnerID, userId: userId , productId: productId };
    return this.myHttp.post(`${this.baseUrl}/add`, order)
  }

}
