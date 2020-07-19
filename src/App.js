import React from 'react';
import './App.scss';
import {Header} from "./components/common/header/Header";
import {RouterMain} from "./Router";
import Footer from "./components/common/Footer";

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
