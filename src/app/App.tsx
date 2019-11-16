import React, { PureComponent } from 'react';
import Routes from '../routes/Routes';
import Menu from '../components/Menu';
import AuthService from '../services/AuthService';

class App extends PureComponent {

  render() {
    return (
      <div className="App">
        {AuthService.isAuthenticated() && <Menu />}
        <Routes />
      </div>
    );
  }
}

export default App;
