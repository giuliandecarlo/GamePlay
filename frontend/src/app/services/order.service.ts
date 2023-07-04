import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    SERVER_URL = "http://localhost:3000/api";
    products: any[] = [];



    constructor(private http: HttpClient,
                private productService: ProductService,
                private orderService: OrderService){}

    getSingleOrder(IdOrdine: number){
        return this.http.get<any>(this.SERVER_URL+'/ordini'+IdOrdine)
    }
}

interface ProductResponseModel {
    id: number;
    titolo: string;
    descrizione: string;
    prezzo: number;
    quantitaOrdinata: number;
    immagine_principale: string;

}