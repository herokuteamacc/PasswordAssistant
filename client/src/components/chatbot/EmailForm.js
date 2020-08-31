import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
class EmailForm  extends Component {
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
    const confirm = steps.poptions.value;
    const email = steps.search2.value;
    const name =steps.name.value;

    

   
    
 }

    render() {
    const { loading, result } = this.state;

    return (
      <div className="EmailForm">
          <textarea>
          Leave Us a Message
We will reply as soon as we can.
</textarea>
       <form>
  <label>
    Name:
    <input type="text" name="name" />
    <input type="text" name="name" />
    <input type="text" name="name" />
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
                    
      </div>
    );
  }
}

EmailForm.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

EmailForm.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

export default EmailForm;
