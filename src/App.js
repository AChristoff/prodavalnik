import React from 'react';
import './App.scss';
import Header from "./components/shared/main/Header";
import {RouterMain} from "./router";
import Footer from "./components/shared/main/Footer";
import {UserProvider, defaultUserState} from "./context/user-context";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        ...defaultUserState,
        updateUserData: this.updateUserData,
      }
    };
  }

  updateUserData = (data) => {
    this.setState({user: {...data}})
  };

  render() {
    const {user} = this.state;

    return (
      <div className="app">
        <UserProvider value={user}>
          <Header/>

          <main className="app-main">
            <RouterMain/>
          </main>

          <Footer/>
        </UserProvider>
      </div>
    );
  }
}

export default App;
