import { User } from '../models/user'
import { Product } from '../models/product'

export class Order{
    // id : number;
    // sourceAddress:string;
    // destinationAddress:string;
    // status:string;
    // amount:number;
    // totalPrice:number;
    // productOwnerID:number;
    // userId:number;
    // productId:number

    id: number;
    orderId:number;
    sourceAddress: string;
    destinationAddress: string;
    status: string;
    amount:string;
    // arrivalTime:Date ;
    totalPrice: number;
    productOwnerID:string;
    productId:string;
    userId : number
}

