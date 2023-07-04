import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { CartModelPublic, CartModelServer } from "../models/cart.model";
import { OrderService } from "./order.service";
import { ProductService } from "./product.service";

@Injectable({
    providedIn: 'root'
})

export class CartService {
    SERVER_URL = "http://localhost:3000/api";

    // I dati del carrello da salvare nel browser in locale
    private cartDataClient: CartModelPublic = {
        total: 0,
        prodData: [{
            incart: 0,
            id: 0
        }]
    };

    // I dati del carrello da salvare nel server
    private cartDataServer: CartModelServer = {
        total: 0,
        data: [{
            product: undefined,
            numerInCart: 0
        }]
    };
    cartTotal$ = new BehaviorSubject<number>(0);
    cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);


    constructor(private http: HttpClient,
                private productService: ProductService,
                private orderService: OrderService,
                private router: Router){}


}
