import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  products: ProductModelServer[] = [];
  constructor(private productService: ProductService,
              private router: Router) {}

ngOnInit(): void { //Funzione che viene eseguita subito
  this.productService.getAllProducts().subscribe((prods:ServerResponse)=> {
    this.products =prods.products;
    console.log(this.products);

    });
  }
selectProduct(id:number){ //Manda al prodotto
  this.router.navigate(['/product',id]).then();
}
ShopNow(id:number){ //Manda al checkout del prodotto
  this.router.navigate(['/checkout',id]).then();
}
}
