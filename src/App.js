import React from 'react';
import './App.css';
import {Header} from "./components/common/Header";
import {RouterMain} from "./components/Router";
import {Footer} from "./components/common/Footer";


function App() {
  return (
    <div className="App">

      <Header/>

      <main>
        <RouterMain/>
      </main>

      <Footer/>

    </div>
  );
}

export default App;
