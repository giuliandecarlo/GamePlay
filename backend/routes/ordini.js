var express = require('express');
const { database } = require('../config/helpers');
var router = express.Router();
let date = new Date();


// Si ottengono tutti gli ordini:
router.get('/',(req,res)=>{
  database.table('ordini')
  .filter()
  .sort({id:-1})
  .getAll()
  .then(ordini=>{
    if(ordini.length>0){
      res.status(200).json({
        count: ordini.length,
        orders: ordini
      });
    }else{
      res.json({message:'Ordine non trovato'});
    }
  }).catch(err=>console.log(err));
});

// Si ottiene il singolo ordine:
router.get('/id',(req,res)=>{
  const orderId =req.params.id;
  database.table('dattagli_ordine ad do')
  .join([
    {
      table: 'ordini as o',
      on: 'o.id = do.id_ordine'
    },
    {
      table: 'prodotti as p',
      on: 'p.id = do.id_prodotto'
    },
    {
      table: 'utenti as u',
      on: 'u.id = o.id_utente'
    }
  ])
  .withFields(['o.id','p.titolo as nome','p.descrizione','p.prezzo','u.username'])
  .filter({'o.id':orderId})
  .getAll()
  .then(ordini=>{
    if(ordini.length>0){
      res.status(200).json(ordini);
    }else{
      res.json({message:'Ordine non trovato'});
    }
  }).catch(err=>console.log(err));
});

// Nuovo ordine creato:
router.post('/new',async(req,res)=>{
  let prodId= req.body.idProd;
  let product = await database.table('prodotti').filter({id:prodId}).get();
  let data = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+1);
  console.log(product.nome);
    database.table('ordini')
    .insert({
      nome_prodotto: product.titolo,
      id_utente: 1,
      data_ordine: data,
      totale_ordine: product.prezzo
    }).catch(err=> console.log(err));
    console.log("Ordine caricato");   
  });

// Si ottiene l'utente con username e password:
router.get('/log',async(req,res)=> {
  let user = req.query.username;
  let pw = req.query.password;
  console.log(user+" "+pw)
  await database.table('utente')
  .filter({
    $and: [
      {username:user},
      {password:pw}
    ]}).get()
.then(prod =>{
  if(prod){
    res.status(200).json(prod);
  }else{
    res.json({message: 'Account non trovato'});
  }
}).catch(err => console.log(err));
});
module.exports = router;
