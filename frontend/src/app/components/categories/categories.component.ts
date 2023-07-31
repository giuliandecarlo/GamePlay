import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  idcat:any;
  products: ProductModelServer[] = [];
  constructor(private productService: ProductService,
              private router: Router,
              private actrouter: ActivatedRoute,) {}

ngOnInit(): void { //Funzione che viene eseguita subito
  this.actrouter.paramMap.pipe(map((param:ParamMap)=>{
    // @ts-ignore
    return param.params.id;
  })).subscribe(catID =>{ 
    this.idcat = catID;
    this.productService.getProductFromCategory(this.idcat).subscribe((prods:ServerResponse)=> { //Dato l'id della categoria si ottengono i prodotti della categoria
    this.products =prods.products;
  });
  });
}
selectProduct(id:number){ //funzione che manda alla pagina prodotto
  this.router.navigate(['/product',id]).then();
}
ShopNow(id:number){ //funzione che manda al checkout del prodotto
  this.router.navigate(['/checkout',id]).then();
}
}
