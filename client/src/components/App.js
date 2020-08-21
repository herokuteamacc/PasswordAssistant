import React, { useState} from 'react';
//import CustomChatbot from './chatbot/chatbot';
import './App.css';
import Test from './chatbot/Test';


const App = (props) =>{
    let [showChat, setShowChat] = useState(false);

  const startChat = () => { setShowChat(true); }
  const hideChat = () => { setShowChat(false); }
    return (
        <>
        <div className = "bot">
          <div style ={{display: showChat ? "" : "none"}}>
          <Test></Test>

          </div>      
          {/* <div> {showChat ? <SimpleForm></SimpleForm> : null} </div> */}
          <div>
            {!showChat 
              ? <button className="btn" onClick={() => startChat()}>Click to chat!</button> 
              : <button className="btn" onClick={() => hideChat()}>Click to hide! </button>}
          </div>
        </div>      
        </>
        
      
)}

export default App;