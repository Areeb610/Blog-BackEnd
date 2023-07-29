const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'bnvslnt1spl0erndqgxq-mysql.services.clever-cloud.com',
    user: 'u2fzx6me4jrh6th7',
    password: 'gtAaV0Geyz7BIuKmESa7',
    database:'bnvslnt1spl0erndqgxq',
    port : 3306
});

connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Connection to database successful!');
    }
} );

module.exports = {connection};