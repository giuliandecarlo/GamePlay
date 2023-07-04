export interface ProductModelServer{
    id: number;
    nome: string,
    categoria: string;
    descrizione:string;
    prezzo:number;
    quantita:number;
    immagine_principale:string;
    immagini_secondarie:string;
}

export interface ServerResponse {
    count: number;
    products: ProductModelServer[];
}