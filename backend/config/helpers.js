const Mysqli = require('mysqli');

let conn = new Mysqli(config={
    host: 'localhost',
    post: 3306,
    user: 'admin',
    passwd: 'password',
    db: 'GamePlay'
});

let db= conn.emit(fromSlave=false, db='');

module.exports ={
    database: db
};