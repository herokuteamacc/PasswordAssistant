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
            this.props.triggerNextStep({trigger:'more'});
      });
    }
    
      
    
  

    render() {
    const { trigger} = this.state;

    return (
      <div className="EmailForm">
          <textarea>Leave Us a Message<br></br>We will reply as soon as we can         
</textarea>
       <form>
  <label>
    Name: <input type="text" name="name" />
    Email: <input type="text" name="name" />
    Phone:<input type="text" name="name" />
    Message:<input type="text" name="name" />
  </label>
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
