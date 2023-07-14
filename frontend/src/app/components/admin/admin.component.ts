import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  newProdcategoria:any;
  newProddescrizione:any;
  newProdprezzo:any;
  newProdquantita:any;


  constructor(private orderService: OrderService,
              private productService: ProductService,
              private router:Router){}
  ngOnInit(){ //Funzione che viene eseguita subito
    this.orderService.getAllOrders().subscribe((ords:any)=> { // si ottengono tutti gli ordini
      this.order =ords.orders;
      console.log(this.order);
      });
      this.productService.getAllProducts().subscribe((prods:any)=> { // Si ottengono tutti i prodotti
        this.products =prods.products;
        console.log(this.products);
    
        });
    }
    editProd(id:number){ //modifica prodotto
      this.addBool=false; // se aperta la sezione aggiungi prodotti viene chiusa
      this.edit=true; // Si apre la sezione modifica
      this.productService.getSingleProduct(id).subscribe(prod=>{
        this.productEdit = prod;
      })
    }
    saveEditing(){ // Salvate le informazioni scritte nel form
      this.productService.editProduct(this.productEdit);
      this.edit=false; //Chiusa la sezione modifica
      this.reloadPage(); //Viene riaggiornata la pagina
    }
    addProd(){
      this.edit=false; // se aperta la sezione modifica prodotti viene chiusa
      this.addBool=true; // Si apre la sezione aggingi prodotti
    }
    saveNew(){ // Salvate le informazioni scritte nel form
      console.log("dati "+this.newProdnome);
      this.productService.newProduct({
        nome:this.newProdnome,
        immagine_principale:this.newProdimmagine_principale,
        immagini_secondarie:this.newProdimmagini_secondarie,
        categoria:this.newProdcategoria,
        descrizione:this.newProddescrizione,
        prezzo:this.newProdprezzo,
        quantita:this.newProdquantita
      });
      this.addBool=false; //Chiusa la sezione aggiungi
      this.reloadPage(); //Viene riaggiornata la pagina
    }
    deleteProd(id:number){
      this.productService.deleteProduct(id); //Eliminazione prodotto
      this.reloadPage(); //Viene riaggiornata la pagina
    }
    reloadPage(){
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
    }
}

