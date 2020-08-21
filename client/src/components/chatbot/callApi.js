
import React, { useState, useEffect } from 'react' 
var cors = require('cors')
const ExampleComponent =  (props) => { 
    const [stateVariable, setStateVariable] = useState('');
    useEffect(() => {

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-______www-form-urlencoded");


var urlencoded = new URLSearchParams();
urlencoded.append("msg","Asit1");


 fetch("http://localhost:8080/getresponse",cors(), {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: urlencoded.toString()
}).then(response => response.text())
.then((response) =>{ console.log(response);
  document.getElementById("response").innerHTML = response;

  
 })
    //fectchData func ending
  }, [])

    return ( 
        <div> 
            <h1>This is a function component view</h1> 
        </div> 
    ) 
} 
export default ExampleComponent;