const { Client } = require('pg');
var connectionString = "postgres://fzsfaovjlqwkvy:e325ed8678fdfdd498d98dfbbf69207a6d2a2c538ee67c324923ebb42d8ab157@ec2-107-20-15-85.compute-1.amazonaws.com:5432/d5tbk7dg1jaedq";
const client = new Client({
    connectionString: connectionString
});

client.connect();


exports.createAccount = function (req, res) {

    var cols = [req.body.name,req.body.email];

    client.query('INSERT INTO salesforce.account(name, email__c) VALUES($1, $2) RETURNING *', cols, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
    console.log("Sucessfully added new record");
    });

};

  module.exports = {
    
    createAccount,
  }