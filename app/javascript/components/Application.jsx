import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TopNav from './shared/TopNav';
import BoardsDashboardContainer from './dashboard/BoardsDashboardContainer';
import BoardContainer from './dashboard/BoardContainer';
import CardContainer from './dashboard/card/CardContainer';

import { fetchBoards } from '../actions/BoardActions';

class Application extends React.Component {
  static contextTypes = {
    store: PropTypes.object,
    history: PropTypes.object,
  }

  componentDidMount() {
    const store = this.context.store;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const state = this.context.store.getState();

    return (
      <div>
        <TopNav />
        <Route path='/' exact component={BoardsDashboardContainer} />
        <Route path='/(boards|cards)/:id' exact component={BoardContainer} />
        <Route path='/cards/:id' exact component={CardContainer} />
      </div>
    );
  }
}

export default Application;
