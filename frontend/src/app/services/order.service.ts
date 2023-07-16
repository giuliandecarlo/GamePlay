import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    SERVER_URL = "http://localhost:3000/api";
    products: any[] = [];



    constructor(private http: HttpClient){}

    getSingleOrder(IdOrdine: number){
        return this.http.get<any>(this.SERVER_URL+'/ordini'+IdOrdine);
    }
    getAllOrders(){
        return this.http.get<any>(this.SERVER_URL+'/ordini');
    }
    newOrder(id:number){
        return this.http.post<any>(this.SERVER_URL+'/ordini/new',{idProd:id}).subscribe();
    }
}

