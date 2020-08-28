import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import SendEmail from './SendEmail'
var check=1;
class DBPedia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
      option: '3',
    };

    this.triggetNext = this.triggetNext.bind(this);
  }


  componentDidMount() {
    const self = this;
    const { steps } = this.props;
    const search = steps.serviceslist.value;
    

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-______www-form-urlencoded");


  var urlencoded = new URLSearchParams();
  urlencoded.append("msg",search);
  
  
fetch("https://password-assistant.herokuapp.com/getresponse", {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
          body: urlencoded.toString()
          
  }).then(response => response.text())
  .then((response) =>{ 
    if ( response==="Password Help"){

     self.setState({ loading: false, result: "Forgot your password?No worries !" ,option: "1"});
     check=2;
    }
    else{
      self.setState({ loading: false, result: "Your request will be directed to"+response +"Queue" ,option: "2"});
    }
       

   })
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      const { option } = this.state;
      if(option===2){
      this.props.triggerNextStep({trigger:'update'});
      }
      else if(option===1){
        this.props.triggerNextStep({trigger:'passwordqueue'});
      }
      else if(option===3){
        this.props.triggerNextStep({trigger:'agent'});
      }
      
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div className="dbpedia">
        { loading ? <Loading /> : result }
        {
          !loading && !trigger &&this.triggetNext()}  
                  
      </div>
    );
  }
}

DBPedia.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

DBPedia.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

const ExampleDBPedia = () => (
  <ChatBot
    steps={[
        {
            id: 'welcome',
            message:'Hello,Welcome to SmartAssistance portal,May I know your name please?',
            trigger: 'name',
          },            
          {
            id: 'name',
            user: true,
            trigger: 'greet',
          },
          {
            id: 'greet',
            message: 'Hi {previousValue}! ,How can I help?',
            trigger: 'serviceslist',
          },
          {

            id: 'serviceslist',
            
             options: [
              { value: 'password', label: 'Password Assistance', trigger: 'bot' },
              { value: 'order', label: 'Order Change', trigger: 'bot' },
              { value: 'ship', label: 'Shipping Address', trigger: 'bot' },
              { value: 'agent', label: 'Talk to Agent', trigger: 'agent' },
            ],
          },
      {
        id: 'bot',
        component: <DBPedia />,
        asMessage:true,
        waitAction: true,
        
      } ,
            {
              id: 'update',
              
              message:"Would you like to update your question?",
              trigger:'update-question',
               },
      {

        id: 'update-question',
        
         options: [
          { value: 'yes', label: 'Yes', trigger: 'update-yes' },
          { value: 'no', label: 'No', trigger: 'end-message' },
        ],
      },
      {
        id: 'update-yes',
        message: 'Ok,Choose your request!',
        trigger: 'serviceslist',
      },
      {
        id: 'agent',
        message: 'Please provide your phone number,Our service agent will contact you',
        trigger: 'contact',
      },           
      {
        id: 'contact',
        user: true,
        trigger: 'contactresponse',
      },
      {
        id: 'contactresponse',
        message: 'got it ,Our service agent will contact you asap',
        trigger: 'contactresponse-more',
      }
      ,
      {
        id: 'contactresponse-more',
        message: 'Is there anything I can help you with',
        trigger: 'update-question',
      }, 
       {
        id: 'passwordqueue',
        message: 'Just click the reset button below and enter your e-mail - we’ll send you login details!',
        trigger: 'update-question',
      },  
{

  id: 'passwordqueue-options',
  
   options: [
    { value: 'yes', label: 'Reset Password', trigger: 'update2-yes' },
    { value: 'no', label: 'Main Menu', trigger: 'serviceslist' },
  ],
},
{
  id: 'update2-yes',
  message: 'Ok,Please enter your email id!',
  trigger: 'search2',
},
          {
        id: 'search2',
        user: true,
        trigger: 'callfun',
      },
     {
    id: 'callfun',
    component : <SendEmail/>,
    asMessage:true,
    trigger: 'more',
  },
{

  id: 'more-conf',
  
   options: [
    { value: 'yes', label: 'Yes', trigger: 'update3-yes' },
    { value: 'no', label: 'No', trigger: 'end-message' },
  ],
},
    
{
  id: 'update3-yes',
  message: 'Sure,Enter your query !',
  trigger: 'serviceslist',
}
,
    
{
  id: 'end2-message',
  message: 'Ok, I wont reset your password.',
  trigger: 'more',
},
    
{
  id: 'more',
  message: 'Do you need any further assistence?',
  trigger: 'more-conf',
},
      {
        id: 'end-message',
        message: 'Thank you for your time.Have a nice day!',
        end: true,
      },
    ]}
  />
);

export default ExampleDBPedia;