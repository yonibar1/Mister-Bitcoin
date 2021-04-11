import './App.scss';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { HomePage } from './views/HomePage'
import { ContactPage } from './views/ContactPage'
import { ContactDetails } from './views/ContactDetails'
import { ContactEdit } from './views/ContactEdit'
import { StatisticPage } from './views/StatisticPage'
import { SignupPage } from './views/SignupPage'
import { AppHeader } from './cmps/AppHeader'

export function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Switch>
          <Route component={ContactDetails} path="/contact/details/:id" />
          <Route component={ContactEdit} path="/contact/edit/:id?" />
          <Route component={ContactPage} path="/contact" />
          <Route component={StatisticPage} path="/statistic" />
          <Route component={HomePage} path="/home" />
          <Route component={SignupPage} path="/" />
        </ Switch>
      </div>
    </ Router>
  );
}


