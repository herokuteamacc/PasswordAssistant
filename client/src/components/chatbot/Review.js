import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


//fetch fun start
const Review=  (props)  => {
const [state, setState] = useState({ msg: ''});
const {msg} = state;


useEffect(() => {
  const { steps } = props;
  const {  msg } = steps;
  setState({msg });
}, [props]) 

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-______www-form-urlencoded");


var urlencoded = new URLSearchParams();
 urlencoded.append("msg",msg.value);
 var ans="Loading..."; 

 
fetch("http://localhost:8080/getresponse", {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
          body: urlencoded.toString()
          
  }).then(response => response.text())
  .then((response) =>{ 
    
      ans = response;
       document.getElementById("verify").innerHTML = ans;
       document.getElementById("fetch").innerHTML = "";
       //var element = document.getElementById("fetch");
    //element.parentNode.removeChild(element);

    //updating div id
    var myEle = document.getElementById("verify");
    if(myEle){
        myEle.id="oldVerify";
    }
     myEle = document.getElementById("fetch");
    if(myEle){
        myEle.id="oldFetch";
    }
    //trigger from jsx
    //setState({msg: ""});
    //props.triggerNextStep({trigger: 'update'});

   })
    /*do{
      var element=document.getElementById("fetch").innerHTML;
      var n =element.search("Loading")
      } while(n!==-1);*/
      
    
      

return(<div id="update-question">Would you like to update your question?</div>); 
       
    }

    




//end of review
    Review.propTypes = {
      steps: PropTypes.object,
    };
    Review.defaultProps = {
      steps: undefined,
    }; 

export default Review;