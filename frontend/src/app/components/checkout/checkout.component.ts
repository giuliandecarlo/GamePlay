import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(private productService: ProductService,
    private actrouter: ActivatedRoute,
    private router: Router){}

  id: any;
  product:any;

  ngOnInit():void{
    this.actrouter.paramMap.pipe(map((param:ParamMap)=>{
      // @ts-ignore
      return param.params.id;
    })).subscribe(prodId =>{
      this.id = prodId;
      this.productService.getSingleProduct(this.id).subscribe(prod=>{
        this.product = prod;
      })
    });
  }

  Complete(id:number):void{
    this.productService.removeQuantity(id).subscribe(resu=>{
      console.log(resu);
      if(resu === 'Quantità modificata'){
        this.router.navigate(['/thankyou/']).then();
      }
    });
  }
}
