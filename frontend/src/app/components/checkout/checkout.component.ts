import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { map } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(private productService: ProductService,
    private actrouter: ActivatedRoute,
    private orderService: OrderService,
    private router: Router){}

  id: any;
  product:any;

  ngOnInit():void{ //Funzione che viene eseguita subito
    this.actrouter.paramMap.pipe(map((param:ParamMap)=>{
      // @ts-ignore
      return param.params.id;
    })).subscribe(prodId =>{
      this.id = prodId;
      this.productService.getSingleProduct(this.id).subscribe(prod=>{ //dato l'id ottiene il prodotto
        this.product = prod;
      })
    });
  }

  Complete(id:number):void{ //ordine completato
    this.productService.removeQuantity(id).subscribe(resu=>{ //riduce la quantità del prodotto nel database
      console.log(resu);
      if(resu === 304){
        this.router.navigate(['/thankyou/']).then(); //manda alla pagina thankyou
        this.orderService.newOrder(this.id);
      }
    });
  }
}
