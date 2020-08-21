
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
//import ExampleComponent from './components/chatbot/callApi'



//import callApi from './components/chatbot/callApi'
ReactDOM.render(
  
    <App/> ,
  document.getElementById('root')
);
//ReactDOM.render( <callApi />, document.getElementById('response') );
//ReactDOM.render( <ExampleComponent />, document.getElementById('root') );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
