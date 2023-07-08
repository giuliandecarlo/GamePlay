import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

declare let $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit{
  id: any;
  product:any;
  thumbImages: any[] = []
  constructor(private productService: ProductService,
              private actrouter: ActivatedRoute,
              private router: Router){}
  ngAfterViewInit(): void {
	// Product Main img Slick
	$('#product-main-img').slick({
    infinite: true,
    speed: 300,
    dots: true,
    arrows: true,
    fade: true,
  });

	// Product imgs Slick
  
  $('#product-imgs').slick({
    slidesToShow:3,
    slidesToScroll: 3,
    arrows: false,
    centerMode: false,
    focusOnSelect: false,
		centerPadding: 0,
		vertical: true,
    asNavFor: '#product-main-img',
		responsive: [{
        breakpoint: 991,
        settings: {
					vertical: false,
					arrows: false,
					dots: true,
        }
      },
    ]
  });

	// Product img zoom
	var zoomMainProduct = document.getElementById('product-main-img');
	if (zoomMainProduct) {
		$('#product-main-img .product-preview').zoom();
	}
  }

  ngOnInit():void{
    this.actrouter.paramMap.pipe(map((param:ParamMap)=>{
      // @ts-ignore
      return param.params.id;
    })).subscribe(prodId =>{
      this.id = prodId;
      this.productService.getSingleProduct(this.id).subscribe(prod=>{
        this.product = prod;
        if(prod.immagini_secondarie !== null){
          this.thumbImages = prod.immagini_secondarie.split(';');
        }
      })
    });
  }
  ShopNow(id:number){
    this.router.navigate(['/checkout/',id]).then();
  }
}
