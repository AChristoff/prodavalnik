import React from 'react';

const Conditional = (props) => {
  return(
    !!props.if && props.children
  );
};

export default Conditional;
