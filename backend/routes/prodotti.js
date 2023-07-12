var express = require('express');
var router = express.Router();
const { database } = require('../config/helpers');

// Si ottengono tutti prodotti:
  router.get('/', function(req, res) {
    let page = (req.query.page != undefined && req.query.page != 0 ) ? req.query.page : 1; //impostata la pagina attuale
    const limit = (req.query.limit != undefined && req.query.limit != 0) ? req.query.limit : 10; //impostato un limite di prodotti per pagina

    let startValue;
    let endValue;

    if (page > 0) {
      startValue = (page * limit ) - limit;
      endValue = page * limit;
    }else{
      startValue = 0;
      endValue = 10;
    }

    database.table('prodotti as p')
    .join([{
      table: 'categorie as c',
      on: 'c.id = p.id_categoria'
    }])
    .withFields(field=['c.titolo as categoria',
    'p.titolo as nome',
    'p.descrizione',
    'p.prezzo',
    'p.quantita',
    'p.immagine_principale',
    'p.immagini_secondarie',
    'p.id',
    'p.id_categoria'
  ])
  .slice(startValue, endValue)
  .sort({id: .1})
  .getAll()
  .then(prods =>{
    if(prods.length>0){
      res.status(200).json({
        count: prods.length,
        products: prods
      });
    }else{
      res.json({message: 'Prodotti non trovati'});
    }
  }).catch(err => console.log(err));
  });

// Si ottiene il singolo prodotto:
  router.get('/:prodId',(req,res)=> {
    let idProdotto = req.params.prodId;
    database.table('prodotti as p')
    .join([{
      table: 'categorie as c',
      on: 'c.id = p.id_categoria'
    }])
    .withFields(field=['c.titolo as categoria',
    'p.titolo as nome',
    'p.descrizione',
    'p.prezzo',
    'p.quantita',
    'p.immagine_principale',
    'p.immagini_secondarie',
    'p.id'
  ])
  .filter({'p.id': idProdotto})
  .get()
  .then(prod =>{
    if(prod){
      res.status(200).json(prod);
    }else{
      res.json({message: 'Prodotto non trovato'});
    }
  }).catch(err => console.log(err));


  });

//Si ottengono tutti prodotti di una specifica categoria:
router.get('/categoria/:nomeCat',(req,res)=>{
  let page = (req.query.page != undefined && req.query.page != 0 ) ? req.query.page : 1; //impostata la pagina attuale
    const limit = (req.query.limit != undefined && req.query.limit != 0) ? req.query.limit : 10; //impostato un limite di prodotti per pagina

    let startValue;
    let endValue;

    if (page > 0) {
      startValue = (page * limit ) - limit;
      endValue = page * limit;
    }else{
      startValue = 0;
      endValue = 10;
    }
  
  const titoloCat = req.params.nomeCat;

    database.table('prodotti as p')
    .join([{
      table: 'categorie as c',
      on: `c.id = p.id_categoria WHERE c.title LIKE '%${titoloCat}%`
    }])
    .withFields(field=['c.titolo as categoria',
    'p.titolo as nome',
    'p.descrizione',
    'p.prezzo',
    'p.quantita',
    'p.immagine_principale',
    'p.id'
  ])
  .slice(startValue, endValue)
  .sort({id: .1})
  .getAll()
  .then(prods =>{
    if(prods.length > 0){
      res.status(200).json({
        count: prods.length,
        products: prods
      });
    }else{
      res.json({message: 'Prodotti non trovati'});
    }
  }).catch(err => console.log(err));
  });

// Si modifica la quantità di prodotti dopo un ordine
router.patch('/sold/:prodId',async(req,res)=> {
  let prodId = req.params.prodId;
  let idp = await database.table('prodotti').filter({id:prodId}).get();
  database.table('prodotti').filter({id: prodId}).update({quantita:idp.quantita-1})
  .then(result =>res.json('Quantità modificata')).catch(err => res.json(err));
});

// Si modifica il prodotto dalla sezione admin
router.patch('/edit',(req,res)=> {
  let prodId = req.body.id;
  if(req.body.quantita<0){req.body.quantita=0}
  if(req.body.prezzo<0){req.body.prezzo=0}
  console.log(prodId);
  database.table('prodotti').filter({id: prodId})
  .update({
    titolo:req.body.nome,
    immagine_principale:req.body.immagine_principale,
    immagini_secondarie:req.body.immagini_secondarie,
    descrizione:req.body.descrizione,
    prezzo:req.body.prezzo,
    quantita:req.body.quantita,
  })
  .then(result =>res.json('Prodotto Modificato')).catch(err => res.json(err));
});

// Aggiunta nuovo prodotto dalla sezione admin
router.post('/new',(req,res)=>{
  if(req.body.quantita<0){req.body.quantita=0}
  if(req.body.prezzo<0){req.body.prezzo=0}
    database.table('prodotti')
    .insert({
    titolo:req.body.nome,
    immagine_principale:req.body.immagine_principale,
    immagini_secondarie:req.body.immagini_secondarie,
    descrizione:req.body.descrizione,
    prezzo:req.body.prezzo,
    quantita:req.body.quantita,
    id_categoria:4,
    descrizione_breve: "gioco"
    }).catch(err=> console.log(err));
    console.log("Prodotto caricato");   
  });

// Eliminazione di un prodotto dalla sezione admin
router.delete('/del/:prodId',(req,res)=>{
  let prodId = req.params.prodId;
  database.table('prodotti')
  .filter({id:prodId})
  .remove()
  .then(result =>res.json('Prodotto eliminato')).catch(err => res.json(err));
});

// Si ottiene l'elenco dei prodotti in base alla ricerca
router.get('/search/:keyword', function(req, res) {
  let key = req.params.keyword;
  console.log(key)
  database.table('prodotti').filter({titolo:{$like: key+'%'}})
  .getAll()
  .then(prods =>{
    console.log(prods);
    res.status(200).json({
      count: prods.length,
      products: prods
    });
  })
  .catch(err => console.log(err));
  });
module.exports = router;
