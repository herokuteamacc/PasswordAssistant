import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
class SendEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
       };

    //this.triggetNext = this.triggetNext.bind(this);
  }
  

  componentDidMount() {
    const self = this;
    const { steps } = this.props;
    const confirm = steps.update2.value;
    const email = steps.search2.value;
    const name =steps.name.value;

    

    if (confirm==='yes' && email !== '')
    {
        fetch('https://password-assistant.herokuapp.com/accounts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email}),
    });

        self.setState({ loading: false, result: "I've reset your password. You'll receive a confirmation email shortly." });
  
    }

    
 }

    render() {
    const { loading, result } = this.state;

    return (
      <div className="sendemail">
          
        { loading ? <Loading /> : result }
                    
      </div>
    );
  }
}

SendEmail.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

SendEmail.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

export default SendEmail;
