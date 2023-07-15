import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  SERVER_URL = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  // Funzione per ottenere tutti i prodotti dal backend
  getAllProducts(numberOfResults=12){
    return this.http.get<any>(this.SERVER_URL + '/prodotti',{
      params: {
        limit: numberOfResults.toString()
      }
    });
  }

// Funzione per ottenere un singolo prodotto dal backend
getSingleProduct(id:number){
  return this.http.get<any>(this.SERVER_URL+'/prodotti/'+id);
}
// Funzione per ottenere prodotti di una determinata categoria
getProductFromCategory(catName:string){
  return this.http.get<any>(this.SERVER_URL+'/prodotti/categoria/'+catName);
}
removeQuantity(id:number){
  return this.http.patch<any>(this.SERVER_URL+'/prodotti/sold/'+id,{});
}
editProduct(editing:any){
  return this.http.patch<any>(this.SERVER_URL+'/prodotti/edit',editing).subscribe();
}
newProduct(newP:any){
  return this.http.post<any>(this.SERVER_URL+'/prodotti/new',newP).subscribe();
}
deleteProduct(id:number){
  return this.http.delete<any>(this.SERVER_URL+'/prodotti/del/'+id).subscribe();
}
getSearchProducts(keyword:any){
  return this.http.get<any>(this.SERVER_URL+'/prodotti/search/'+keyword);
}
}
