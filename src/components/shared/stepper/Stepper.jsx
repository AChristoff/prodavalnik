import React from 'react';
import './stepper.scss';
import {Done} from "@material-ui/icons";

class Stepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepOneDone: false,
      stepTwoDone: false,
      stepThreeDone: false,
    };
    this.userId = window.localStorage.getItem('userId')
  }

  componentWillMount() {

    this.setState({
      stepOneDone: this.props.stepOneDone,
      stepTwoDone: this.props.stepTwoDone,
    });
  }

  render() {
    const {stepOneDone, stepTwoDone, stepThreeDone} = this.state;

    return (
      <div className="Stepper">

        <div className="step">
          <div className="step-number-one">
            {
              stepOneDone
                ? <Done className="done"/>
                : 1
            }
          </div>
          <div className="step-label">Email</div>
        </div>

        <div className="step">
          <div className={stepOneDone ? 'step-number-two' : 'step-number-two disabled'}>
            {
              stepTwoDone
                ? <Done className="done"/>
                : 2
            }
          </div>
          <div className="step-label">Password</div>
        </div>

        <div className="step">
          <div className="step-number-three disabled">
            {
              stepThreeDone
                ? <Done className="done"/>
                : 3
            }
          </div>
          <div className="step-label">Done</div>
        </div>

      </div>
    );
  }
}

export default Stepper;