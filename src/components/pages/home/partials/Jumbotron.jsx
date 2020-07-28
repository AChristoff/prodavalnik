import React from 'react';
import Search from "../../../shared/Search";

class Jumbotron extends React.Component {

  render() {

    return (
      <div className="jumbotron">
        <div className="wrapper">

          <h1><span>Buy</span> & <span>sell</span> online!</h1>

          <Search ableRedirect={true}/>

        </div>
      </div>
    );
  }
}

export default Jumbotron;
