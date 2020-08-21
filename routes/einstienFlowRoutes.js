module.exports = app =>{

    var bodyParser = require('body-parser');
    http = require('http'),
    server = require('http').createServer(app);
    var jwtObj = require('jsonwebtoken');
    
    const fs = require('fs');
    var moment = require('moment');
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    var privateKey = fs.readFileSync('einstein_platform.pem');
    var assertString ;

     var unixTime = moment().add({'seconds':100000}).unix();//Get this time from Env Vars

jwtObj.sign(
    {   "sub": "ykalmanoor@deloitte.com",
        "aud": "https://api.einstein.ai/v2/oauth2/token",
        "exp": unixTime
    }, privateKey, { algorithm: 'RS256' }, function(err, token) {
    if(err){
        console.log('Error while signing JWT certificate to generate assertString');
        console.log(err);
    }
    assertString = token;
  });


    app.post('/getresponse',function(req,resp){

        console.log(req.body);
        
        var msg = req.body.msg;
        
        var request = require('request');
        
        console.log(assertString);
        console.log('Called out Our Prediction Model with Salesforce Einstein  for request : \n'+msg+'\n');
        
        //Start - Using assertString to Get Token
        var finalEinsteinToken = '';
        
            //Assert string response object
        var options_assertString = {
            'method': 'POST',
            'url': 'https://api.einstein.ai/v2/oauth2/token',
            'headers': {
              'Content-type': 'application/x-www-form-urlencoded'
            },
            form: {
              'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
              'assertion': assertString
            }
          };
            
            //request method - Starting the call to JWT
          request(options_assertString, function (error, response) {
            if (error) {
                console.log('Error while retieving assertion string');
                throw new Error(error);
            }
            console.log('Got the response');
            console.log(JSON.parse(response.body));
              
            finalEinsteinToken = JSON.parse(response.body).access_token;
            console.log('Bearer '+finalEinsteinToken);
        
            var options = {
                'method': 'POST',
                'url': 'https://api.einstein.ai/v2/language/intent',
                'headers': {
                    'Authorization': 'Bearer '+finalEinsteinToken,
                    'Content-Type': 'multipart/form-data',
                    'Cache-Control': 'no-cache'
                },
                formData: {
                    'modelId': 'IZVK4GYPFQSUPMXB546LXSZ76Q',
                    'document': msg
                }
                };
                
                var AIResponse;
                
              //Second request to eintein
                request(options, function (error, response) {
                    if (error) {
                        console.log('Error while fetching AI response using Token');
                        throw new Error(error);
                    }
        
                    console.log(response.body);
                    var parsedVars = JSON.parse(response.body);
                    AIResponse = parsedVars.probabilities[0].label;
                    console.log('Highest of probable values returned: \n'+AIResponse+'\n');
                    resp.send(AIResponse);
                    //resp.end(AIResponse);
                });//EINSTEIN REQUEST END
              
          });  //JWT REQUEST END
        
        });

}
