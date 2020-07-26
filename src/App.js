import React from 'react';
import './App.scss';
import Header from "./components/shared/main/Header";
import {RouterMain} from "./router";
import Footer from "./components/shared/main/Footer";
import AuthContextProvider from "./context/user-context";
import OfferContextProvider from "./context/offer-context";

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <OfferContextProvider>
          <AuthContextProvider>

            <Header/>
            <main className="app-main">
              <RouterMain/>
            </main>
            <Footer/>

          </AuthContextProvider>
        </OfferContextProvider>
      </div>
    );
  }
}

export default App;
