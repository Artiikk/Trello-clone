import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import './styles/main.scss';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
    </Switch>
  );
}

export default App;
