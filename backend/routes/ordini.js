var express = require('express');
const { database } = require('../config/helpers');
var router = express.Router();

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */

// Si ottengono tutti gli ordini:
router.get('/',(req,res)=>{
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
  .sort({id:1})
  .getAll()
  .then(ordini=>{
    if(ordini.length>0){
      res.status(200).json(ordini);
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
})

// Nuovo ordine creato:
router.post('/new',(req,res)=>{

  let {userId,products}= req.body;
  
  if(userId != null && userId > 0 && !isNaN(userId))
  {
    database.table('ordini')
    .insert({
      id_utente: userId
    }).then(newOrderId =>{

      if(newOrderId > 0){
        products.foreach(async(p)=>{
          let data = await database.table('prodotti').filter({id:p.id}).withFields(['quantità']).get();
          let inCart = p.incart;
          // si calcola il numero di prodotti ordinati dalla colonna quantità del database
          if(data.quantità > 0){
            data.quantità = data.quantità - inCart;
            
            if(data.quantità < 0){

            }

          }else{
            data.quantità = 0;
          }

          database.table('dettagli_ordine')
          .insert({
            orderId: newOrderId,
            id_prodotto: p.id,
            quantità: inCart
          }).then(newId =>{
            database.table('prodotti')
            .filter({id:p.id})
            .update({
              quantità:data.quantità
            }).then(successNum=>{}).catch(err=>console.log(err));
          }).catch(err=> console.log(err));

        });
      }else{
        res.json({message:'Impossibile aggiungere dettagli ordine',success: false})
      }
      res.json({
        message: 'Ordine effettuato con successo.',
        success: true,
        id_ordine: newOrderId,
        prodotti: products
      })
    }).catch(err=>console.log(err));
  }else{
    res.json({message:'Errore durante la creazione del nuovo ordine.', success: false});
  }
});

// Finto pagamento:
router.post('/payment',(req,res)=>{
  setTimeout(()=>{
    res.status(200).json({success: true});
  },3000);
});
module.exports = router;
