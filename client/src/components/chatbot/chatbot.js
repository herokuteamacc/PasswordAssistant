import React, { Component } from 'react';
import Chatbot from 'react-simple-chatbot';
import Review from './Review';
import Verify from './Verify';



class CustomChatbot extends Component{

    render(){
        return (
            <Chatbot
          steps={[
            {
              id: '1',
              message: 'What is your name?',
              trigger: 'name',
            },            
            {
              id: 'name',
              user: true,
              trigger: '3',
            },
            {
              id: '3',
              message: 'Hi {previousValue}! ,How can I help?',
              trigger: 'msg',
            },
            {
              id: 'msg',
              user: true,
              trigger:'reply',

              },
                        
             {
              id: 'reply',
              component: <Verify/>,
              asMessage:true,
               trigger:'update',         
            },
            {
              id: 'update',
              component:<Review/>,
              asMessage:true,
              trigger:'update-question'
               },

               {

              id: 'update-question',
              
               options: [
                { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                { value: 'no', label: 'No', trigger: 'end-message' },
              ],
            },
            {
              id:'update-yes',
              message: 'Ok,Enter your query!',
              trigger: 'msg',
            },
            {
              id: 'end-message',
              message: 'Thank you for your time.Have a nice day!',
              end: true,
            },
          ]
        }
        />
        )
    }
    
}

export default CustomChatbot;