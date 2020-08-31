import React, { Component } from 'react';
import PropTypes from 'prop-types';
class EmailForm  extends Component {
  constructor(props) {
    super(props);

    this.state = {
        trigger: false,
       };
       this.triggetNext = this.triggetNext.bind(this);
    
  }
  

  componentDidMount() {
    
    

   
    
 }

 triggetNext() {
    this.setState({ trigger: true }, () => {
            this.props.triggerNextStep({trigger:'shipresponse'});
      });
    }
    
      
    
  

    render() {
    const { trigger} = this.state;

    return (
      <div style={{ width: '100%'}} className="EmailForm">
          
       <form>
       Leave Us a Message
       We will reply as soon as we can 
       <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td><input type="text" name="name" /></td>
            </tr>
            <tr>
              <td>Email</td>
              <td><input type="text" name="name" /></td>
            </tr>
            <tr>
              <td>Phone</td>
              <td><input type="text" name="name" /></td>
            </tr>
            <tr>
              <td>Message</td>
              <td><input type="text" name="name" /></td>
            </tr>
          </tbody>
        </table>
   {!trigger &&
              <button
                onClick={() => this.triggetNext()}
              >
                Submit
              </button>
            }
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
