import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import renderRouters from '@/components/renderRoutes';
import routerConfig from '@/config/routes';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return <Router history={history}>{renderRouters(routerConfig)}</Router>;
  }
}

ReactDom.render(<App />, document.getElementById('root'));
