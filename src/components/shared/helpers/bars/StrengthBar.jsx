import React, {useContext} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import './strength-bar.scss'
import {AuthContext} from "../../../../context/user-context";
import Typography from "@material-ui/core/Typography";

export default function StrengthBar() {
  //Context
  const {passLevel} = useContext(AuthContext);

  let status;
  let color = '';

  switch (passLevel) {

    case 25:
      status = 'Weak!';
      color = 'orange';
      break;
    case 50:
      status = 'Good!';
      color = 'blue';
      break;
    case 75:
      status = 'Strong!';
      color = 'green';
      break;
    case 100:
      status = 'Great!';
      color = 'light-green';
      break;
    case 0:
      status = '';
      break;
  }

  return (
    <div id="loading-bar-wrapper" className={color ? color : ''}>
      <LinearProgress id="loading-bar" variant="determinate" value={passLevel}/>
      <Typography variant="body2" color="textSecondary">
        <span className="static-text">Password strength: </span><span className="dynamic-text">{status}</span>
      </Typography>
    </div>
  );
}