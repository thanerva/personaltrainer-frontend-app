import React from 'react';
import CustomerList from './components/CustomerList';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import TrainingList from './components/TrainingList';
import Home from './components/Home';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Link to="/">Home</Link>{' '}
          <Link to="/traininglist/">List of trainings</Link>{' '}
          <Link to="/customerlist/">List of customers</Link>{' '}
          <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/traininglist/" component={TrainingList} />
          <Route path="/customerlist/" component={CustomerList} />
          <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
