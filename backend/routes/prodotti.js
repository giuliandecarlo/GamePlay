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
    'p.prezzo',
    'p.quantità',
    'p.immagine_principale',
    'p.id'
  ])
  .slice(startValue, endValue)
  .sort({id: .1})
  .getAll()
  .then(prods =>{
    if(prods.lenght > 0){
      res.status(200).json({
        count: prods.lenght,
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
    'p.prezzo',
    'p.quantità',
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
    'p.prezzo',
    'p.quantità',
    'p.immagine_principale',
    'p.id'
  ])
  .slice(startValue, endValue)
  .sort({id: .1})
  .getAll()
  .then(prods =>{
    if(prods.lenght > 0){
      res.status(200).json({
        count: prods.lenght,
        products: prods
      });
    }else{
      res.json({message: 'Prodotti non trovati'});
    }
  }).catch(err => console.log(err));
  });


module.exports = router;
