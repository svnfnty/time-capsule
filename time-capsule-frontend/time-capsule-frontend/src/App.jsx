import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CapsuleForm from './components/CapsuleForm';
import CapsuleList from './components/CapsuleList';
import CapsuleDetails from './components/CapsuleDetails';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Time Capsule</h1>
        <Switch>
          <Route path="/" exact component={CapsuleList} />
          <Route path="/create" component={CapsuleForm} />
          <Route path="/capsule/:id" component={CapsuleDetails} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;