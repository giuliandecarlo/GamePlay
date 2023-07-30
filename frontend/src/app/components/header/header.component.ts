import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServerResponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private productService: ProductService,
              private router: Router) {}
  products_search:any;

  //Funzione che ad ogni carattere digitato viene richiamata per cercare i prodotti
  searchBar(event: any){
    this.productService.getSearchProducts(event.target.value).subscribe((prods:ServerResponse)=> {
      this.products_search =prods.products;
      //console.log(this.products_search);
      });
  }
  selectProduct(id:number){ //Manda al prodotto
    this.router.navigate(['/product',id]).then();
  }
}
