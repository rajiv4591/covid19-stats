import React from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import Resources from './components/Resources/Resources';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/resources">
            <Resources />
          </Route>
          <Route path="/tweets">
            <p>Test</p>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
