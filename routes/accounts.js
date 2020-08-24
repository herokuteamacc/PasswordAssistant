const { Client } = require('pg');
var connectionString = "postgres://fzsfaovjlqwkvy:e325ed8678fdfdd498d98dfbbf69207a6d2a2c538ee67c324923ebb42d8ab157@ec2-107-20-15-85.compute-1.amazonaws.com:5432/d5tbk7dg1jaedq";
const client = new Client({
    connectionString: connectionString
});

client.connect();


const createAccount = (body) => {
    return new Promise(function(resolve, reject) {
      const { name, email } = body
      client.query('INSERT INTO accounts (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new account has been added added: ${results.rows[0]}`)
      })
    })
  }

  module.exports = {
    
    createAccount,
  }