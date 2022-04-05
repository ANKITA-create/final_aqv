import React from 'react';

import './App.css';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Home  from './pages';

import MapPage from './pages/maps';
import BarPage from './pages/bar';

// import MapPage from './pages/maps';

import Visual from './pages/weather';
class App extends React.Component {
  render(){
  return (
      <Router>
        <Switch>
        <Route path='/' component={Home}  exact />
            
          <Route path='/maps' component={MapPage} exact />
      
          <Route path='/weather' component={Visual} exact />
          <Route path='/bar' component={BarPage} exact />

          </Switch>
        </Router>
    
  );
}
};

export default App;
