import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';

class DBPedia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }


  componentDidMount() {
    const self = this;
    const { steps } = this.props;
    const search = steps.search.value;
    

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-______www-form-urlencoded");


  var urlencoded = new URLSearchParams();
  urlencoded.append("msg",search);
  
  
fetch("https://einsetin-chat-bot.herokuapp.com/getresponse", {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
          body: urlencoded.toString()
          
  }).then(response => response.text())
  .then((response) =>{ 
    self.setState({ loading: false, result: response });
      
       

   })
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep({trigger:'update'});
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
            id: '1',
            message: 'What is your name?',
            trigger: 'name',
          },            
          {
            id: 'name',
            user: true,
            trigger: '31',
          },
          {
            id: '31',
            message: 'Hi {previousValue}! ,How can I help?',
            trigger: 'search',
          },
          {
        id: 'search',
        user: true,
        trigger: '3',
      },
      {
        id: '3',
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
        message: 'Ok,Enter your query!',
        trigger: 'search',
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