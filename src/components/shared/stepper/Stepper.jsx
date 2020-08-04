import React, {useState} from 'react';
import './stepper.scss';
import {Done} from "@material-ui/icons";

const Stepper = (props) => {

  const [stepOneDone, setStepOneDone] = useState(props.stepOneDone || false);
  const [stepTwoDone, setStepTwoDone] = useState(props.stepTwoDone || false);
  const [stepThreeDone, setStepThreeDone] = useState(props.stepThreeDone || false);


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
          <div className={stepTwoDone ? 'step-number-three' : 'step-number-three disabled'}>
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
};

export default Stepper;