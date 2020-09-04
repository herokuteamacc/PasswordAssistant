const { Client } = require('pg');
var connectionString = "postgres://rzdgywrdwljlwb:9b69b0eabee4f1657388cdb42b75773194da017a3fd8ff4601f54d7f6bf63f0a@ec2-34-198-103-34.compute-1.amazonaws.com:5432/d9pqlcnagm84ol";
const client = new Client({
    connectionString: connectionString
});

client.connect();


createAccount = function (req, res) {

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