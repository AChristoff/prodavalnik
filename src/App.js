import React from 'react';
import './App.scss';
import Header from "./components/shared/Header";
import {RouterMain} from "./router";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <div className="app">

      <Header/>

      <main className="app-main">
        <RouterMain/>
      </main>

      <Footer/>

    </div>
  );
}

export default App;
