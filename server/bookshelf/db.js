/**
 * Created by danesmith on 11/23/15.
 */
var Bookshelf = require('bookshelf');

var config = {
    host: 'localhost:5432',  // your host
    user: 'root', // your database user
    password: '', // your database password
    database: 'PrimeOrigin',
    charset: 'UTF8_GENERAL_CI'
};

var DB = Bookshelf.initialize({
    client: 'postgresql',
    connection: config
});

module.exports.DB = DB;