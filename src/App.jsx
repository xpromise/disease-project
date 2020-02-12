import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/home';
import NotMatch from './components/not-match';

import { initRem } from './utils/tools';

function App() {
  useEffect(() => {
    initRem();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route component={NotMatch} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
