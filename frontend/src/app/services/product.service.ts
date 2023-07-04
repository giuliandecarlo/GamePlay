import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  SERVER_URL = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  // Funzione per ottenere tutti i prodotti dal backend
  getAllProducts(numberOfResults=10){
    return this.http.get<any>(this.SERVER_URL + '/prodotti',{
      params: {
        limit: numberOfResults.toString()
      }
    });
  }

// Funzione per ottenere un singolo prodotto dal backend
getSingleProduct(id:number){
  return this.http.get<any>(this.SERVER_URL+'/products'+id);
}
// Funzione per ottenere prodotti di una determinata categoria
getProductFromCategory(catName:string){
  return this.http.get<any>(this.SERVER_URL+'/prodotti/category/'+catName);
}
}
