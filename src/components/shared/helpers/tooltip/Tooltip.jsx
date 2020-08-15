import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: '#2B2B2B',
  },
  tooltip: {
    backgroundColor: '#2B2B2B',
    fontSize: theme.typography.pxToRem(13),
  },
}));

export default function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

