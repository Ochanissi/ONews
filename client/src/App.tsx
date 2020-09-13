import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

// import { createStructuredSelector } from 'reselect';
// import { selectNewsArticles } from './redux/news/news.selectors';

// import { fetchNewsStartAsync } from './redux/news/news.actions';
// import { AppActions } from './redux/store';

// import { ThunkDispatch } from 'redux-thunk';
// import { News } from './redux/news/news.types';

import SignUp from './pages/sign-up/sign-up.component';
import SignIn from './pages/sign-in/sign-in.component';

import {
  selectUserCategory,
  selectUserCountry,
  selectCurrentUser,
} from './redux/user/user.selectors';

import './App.scss';

import HomePage from './pages/home-page/home-page.component';
import NavBar from './components/navbar/navbar.component';
import Sidebar from './components/sidebar/sidebar.component';
import Profile from './pages/profile/profile.component';
import { User } from './redux/user/user.types';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from './redux/store';
import {
  getUserLikedStartAsync,
  getUserSavedStartAsync,
} from './redux/user/user.actions';
// import { setCurrentUser } from './redux/user/user.actions';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': { name: string };
    }
  }
}

interface AppProps {}

type Props = AppProps & LinkDispatchProps & LinkStateProps;

const App: React.FunctionComponent<Props> = ({
  userCategory,
  userCountry,
  currentUser,
}): JSX.Element => {
  if (currentUser) {
    getUserSavedStartAsync(currentUser.email);
    getUserLikedStartAsync(currentUser.email);
  }

  return (
    <div className='App'>
      <NavBar />
      <Sidebar />
      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <Redirect to={`/news/${userCountry}/${userCategory}`} />
          )}
        />
        <Route
          exact
          path='/profile'
          render={() =>
            currentUser ? <Profile /> : <Redirect to='/auth/sign-in' />
          }
        />
        <Route
          exact
          path='/auth/sign-in'
          render={() => (currentUser ? <Redirect to='/' /> : <SignIn />)}
        />
        <Route
          exact
          path='/auth/sign-up'
          render={() => (currentUser ? <Redirect to='/' /> : <SignUp />)}
        />

        <Route exact path='/news/:country/:category' component={HomePage} />
      </Switch>
    </div>
  );
};

interface LinkDispatchProps {
  getUserSavedStartAsync: (email: string) => void;
  getUserLikedStartAsync: (email: string) => void;
}

interface LinkStateProps {
  userCategory: string;
  userCountry: string;
  currentUser: User;
}

const mapStateToProps = createStructuredSelector({
  userCategory: selectUserCategory,
  userCountry: selectUserCountry,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  getUserSavedStartAsync: (email) => dispatch(getUserSavedStartAsync(email)),
  getUserLikedStartAsync: (email) => dispatch(getUserLikedStartAsync(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
