import React from 'react';

import './App.scss';

import HomePage from './pages/home-page/home-page.component';
import NavBar from './components/navbar/navbar.component';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <HomePage />
    </div>
  );
}

export default App;
