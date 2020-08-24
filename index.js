var express = require('express');
app = express();
var cors = require('cors');

app.use(cors()) ;
require('./routes/einstienFlowRoutes')(app);
//start of einstien code
var accounts =require('./routes/accounts');

 //APP POST END

if (process.env.NODE_ENV === 'production') {
    
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.post('/accounts', accounts.createAccount);
server.listen(process.env.PORT || 8080);
 //end of einstien code
 /*End using APP*/
 
