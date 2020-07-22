import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';

import HomePage from './pages/home-page/home-page.component';
import NavBar from './components/navbar/navbar.component';
import Sidebar from './components/sidebar/sidebar.component';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Sidebar />
      <Switch>
        <Route exact path='/' component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
