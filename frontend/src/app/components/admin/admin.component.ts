import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  order:any;
  products:any;
  edit=false;
  addBool=false;
  productEdit:any;

  newProdnome:any;
  newProdimmagine_principale:any;
  newProdimmagini_secondarie:any;
  newProddescrizione:any;
  newProdprezzo:any;
  newProdquantita:any;


  constructor(private orderService: OrderService,
              private productService: ProductService){}
  ngOnInit(){
    this.orderService.getAllOrders().subscribe((ords:any)=> {
      this.order =ords.orders;
      console.log(this.order);
      });
      this.productService.getAllProducts().subscribe((prods:any)=> {
        this.products =prods.products;
        console.log(this.products);
    
        });
    }
    editProd(id:number){
      this.addBool=false;
      this.edit=true;
      this.productService.getSingleProduct(id).subscribe(prod=>{
        this.productEdit = prod;
      })
    }
    saveEditing(){
      this.productService.editProduct(this.productEdit);
      this.edit=false;
    }
    addProd(){
      this.edit=false;
      this.addBool=true;
    }
    saveNew(){
      console.log("dati "+this.newProdnome);
      this.productService.newProduct({
        nome:this.newProdnome,
        immagine_principale:this.newProdimmagine_principale,
        immagini_secondarie:this.newProdimmagini_secondarie,
        descrizione:this.newProddescrizione,
        prezzo:this.newProdprezzo,
        quantita:this.newProdquantita
      });
      this.addBool=false;
    }
    deleteProd(id:number){
      this.productService.deleteProduct(id);
    }
}

