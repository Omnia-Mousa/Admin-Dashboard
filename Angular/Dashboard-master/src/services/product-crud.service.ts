import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/models/product';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class ProductCrudService {

  products: Product[];

  constructor(private myHttp: HttpClient) { }

  baseDash: string = "http://localhost:5000/api/dashboard";
  dashboardUrl: string = "http://localhost:5000/api/dashboard/getProducts"
  productUrl : string = "http://localhost:5000/api/dashboard/getone"

  // async displayAllProducts() {
  //   let response = await this.myHttp.get<any>(this.baseUrl).toPromise();
  //   return response;
  // }

  getAllProducts(){
    return this.myHttp.get(this.dashboardUrl , {observe:"body"})
  }

  getProductById(id: number){
    return this.myHttp.get(`${this.productUrl}/${id}`, { observe: "body" })
  }

  deleteProduct(id) {
    return this.myHttp.delete(`${this.baseDash}/Delete/${id}`, { observe: "body" })
  }

  addProduct(id: number, title: string, price: number, imageUrl: string, description: string, status : string, amount: number, category: string, rate: number , userId:number , user: User) {
    const product: Product = { id: id, title: title, price: price, imageUrl: imageUrl, description: description, status: status ,amount: amount, category: category, rate: rate , userId: userId , user:user };
    return this.myHttp.post(`${this.baseDash}/addProduct`, product)
  }

 
  edidProduct(id: number , product: Product) {
    // const myproduct: Product = { id:id ,title : product.title, price : product.price , imageUrl : product.imageUrl , description : product.description , amount : product.amount, category: product.category , rate: product.rate };
    return this.myHttp.patch(`${this.baseDash}/Edit/${id}`, product)
    
  }

  // editProductStatus(id : number , status : string){
  //   return this.myHttp.patch(`http://localhost:5000/api/dashboard/editStatus/${id}`, status)
  // }

  editProductStatus(id : number , product : Product){
    return this.myHttp.patch(`http://localhost:5000/api/dashboard/editStatus/${id}`, product)
  }


}

