import { User } from '../models/user'

export class Product{
    id : number;
    title:string;
    price:number;
    imageUrl:string;
    description:string;
    status:string;
    amount:number;
    category:string;
    rate:number;
    userId:number;
    user:User
}


 
