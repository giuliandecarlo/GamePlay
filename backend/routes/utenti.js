var express = require('express');
const { database } = require('../config/helpers');
var router = express.Router();



// Si ottiene l'utente con username e password:
router.get('/log',async(req,res)=> {
    let user = req.query.username;
    let pw = req.query.password;
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