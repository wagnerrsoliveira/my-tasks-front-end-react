import React, { PureComponent } from 'react';
import Routes from '../routes/Routes';
import Menu from '../components/Menu';
import AuthService from '../services/AuthService';
import TasksContext from './context/TasksContext';
import { IAppProps, IAppState } from './types';

import './App.css';

class App extends PureComponent<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      loading: false,
      isAuthenticated: AuthService.isAuthenticated()
    }
  }

  private setIsAuthenticated = (isAuthenticated: boolean) => {
    this.setState({
      ...this.state,
      isAuthenticated
    });
  }

  private getIsAuthenticated = () => {
    return this.state.isAuthenticated;
  }

  private setLoading = (loading: boolean) => {
    this.setState({
      ...this.state,
      loading
    });
  }

  private getLoading = () => {
    return this.state.loading;
  }

  render() {
    return (
      <div className="App">
        <TasksContext.Provider value={
          {
            setIsAuthenticated: this.setIsAuthenticated,
            getIsAuthenticated: this.getIsAuthenticated,
            setLoading: this.setLoading,
            getLoading: this.getLoading
          }
        }>

          {this.state.isAuthenticated && <Menu />}
          <Routes />
        </TasksContext.Provider>
      </div>
    );
  }
}

export default App;
