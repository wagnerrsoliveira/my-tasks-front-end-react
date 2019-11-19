import React, { PureComponent } from 'react';
import Routes from '../routes/Routes';
import Menu from '../components/Menu';
import AuthService from '../services/AuthService';
import TasksContext from './context/TasksContext';
import { IAppProps, IAppState } from './types';

import './App.css';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { EMessage } from '../components/Message/types';

class App extends PureComponent<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      loading: false,
      isAuthenticated: AuthService.isAuthenticated(),
      message: "",
      openMessage: false,
      typeMessage: EMessage.info
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

  private handleOpenMessage = (message: string, typeMessage: EMessage) => {
    this.setState({
      ...this.state,
      message,
      openMessage: true,
      typeMessage
    })
  }

  private handleCloseMessage = () => {
    this.setState({
      ...this.state,
      message: "",
      openMessage: false
    })
  }


  render() {
    return (
      <>
        <TasksContext.Provider value={
          {
            setIsAuthenticated: this.setIsAuthenticated,
            getIsAuthenticated: this.getIsAuthenticated,
            setLoading: this.setLoading,
            getLoading: this.getLoading,
            handleOpenMessage: this.handleOpenMessage
          }
        }>

          {this.state.isAuthenticated && <Menu />}
          {this.state.loading && <Loading />}
          <Routes reload={this.state.isAuthenticated} />
        </TasksContext.Provider>
        <Message
          message={this.state.message}
          open={this.state.openMessage}
          handleCloseMessage={this.handleCloseMessage}
          type={this.state.typeMessage}
        />
      </>
    );
  }
}

export default App;
