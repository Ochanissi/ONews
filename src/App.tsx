import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { fetchNewsStartAsync, AppActions } from './redux/news/news.actions';

import { ThunkDispatch } from 'redux-thunk';

import './App.scss';

import HomePage from './pages/home-page/home-page.component';
import NavBar from './components/navbar/navbar.component';
import Sidebar from './components/sidebar/sidebar.component';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component<any> {
  componentDidMount() {
    const { fetchNewsStartAsync } = this.props;

    fetchNewsStartAsync();
  }

  render() {
    return (
      <div className='App'>
        <NavBar />
        <Sidebar />
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   currentUser: user.currentUser,
// });

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
// });

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  fetchNewsStartAsync: () => dispatch(fetchNewsStartAsync()),
});

export default connect(null, mapDispatchToProps)(App);
// export default App;
