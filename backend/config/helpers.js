const Mysqli = require('mysqli');

let conn = new Mysqli({ //Dati per l'accesso al Database
    host: 'localhost',
    post: 3306,
    user: 'root',
    passwd: '',
    db: 'GamePlay'
});

let db= conn.emit(false,'');

module.exports ={
    database: db
};