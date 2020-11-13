import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

// import { createStructuredSelector } from 'reselect';
// import { selectNewsArticles } from './redux/news/news.selectors';

// import { fetchNewsStartAsync } from './redux/news/news.actions';
// import { AppActions } from './redux/store';

// import { ThunkDispatch } from 'redux-thunk';
// import { News } from './redux/news/news.types';

import SignUp from "./pages/sign-up/sign-up.component";
import SignIn from "./pages/sign-in/sign-in.component";

import {
  selectUserCategory,
  selectUserCountry,
  selectCurrentUser,
  selectUserAuthorization,
} from "./redux/user/user.selectors";

import "./App.scss";

import HomePage from "./pages/home-page/home-page.component";
import SearchPage from "./pages/search-page/search-page.component";
import NavBar from "./components/navbar/navbar.component";
import Profile from "./pages/profile/profile.component";
import { Authorization, User } from "./redux/user/user.types";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "./redux/store";
import {
  getCurrentUserStartAsync,
  getUserDislikedStartAsync,
  getUserHiddenStartAsync,
  getUserLikedStartAsync,
  getUserSavedStartAsync,
  getUserSearchesStartAsync,
} from "./redux/user/user.actions";
import ProfileData from "./pages/profile-data/profile-data.component";
// import { render } from '@testing-library/react';
// import { isJsxAttributes, JsxEmit } from 'typescript';
import ProfileSettings from "./pages/profile-settings/profile-settings.components";
import BackToTop from "./components/back-to-top/back-to-top.component";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top.component";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": { name: string };
    }
  }
}

interface AppProps {}

type Props = AppProps & LinkDispatchProps & LinkStateProps;

class App extends React.Component<Props> {
  componentDidMount() {
    const {
      userAuthorization,
      getCurrentUserStartAsync,
      getUserSavedStartAsync,
      getUserLikedStartAsync,
      getUserDislikedStartAsync,
      getUserHiddenStartAsync,
      getUserSearchesStartAsync,
    } = this.props;

    if (userAuthorization) {
      const { email, token } = userAuthorization;

      getCurrentUserStartAsync(email, token);
      getUserSavedStartAsync(email, token);
      getUserLikedStartAsync(email, token);
      getUserDislikedStartAsync(email, token);
      getUserHiddenStartAsync(email, token);
      getUserSearchesStartAsync(email, token);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const {
      userAuthorization,
      getCurrentUserStartAsync,
      getUserSavedStartAsync,
      getUserLikedStartAsync,
      getUserDislikedStartAsync,
      getUserHiddenStartAsync,
      getUserSearchesStartAsync,
    } = this.props;

    if (userAuthorization !== prevProps.userAuthorization) {
      if (userAuthorization) {
        const { email, token } = userAuthorization;

        getCurrentUserStartAsync(email, token);
        getUserSavedStartAsync(email, token);
        getUserLikedStartAsync(email, token);
        getUserDislikedStartAsync(email, token);
        getUserHiddenStartAsync(email, token);
        getUserSearchesStartAsync(email, token);
      }
    }
  }

  render() {
    const { userCategory, userCountry, currentUser } = this.props;

    return (
      <div className="App">
        <ScrollToTop>
          <BackToTop />
          <NavBar />

          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Redirect to={`/news/${userCountry}/${userCategory}`} />
              )}
            />
            <Route exact path="/news/:country/:category" component={HomePage} />
            <Route
              exact
              path="/search/:query/:queryTitle/:date/:lang/:sortBy"
              component={SearchPage}
            />
            <Route
              exact
              path="/auth/sign-in"
              render={() => (currentUser ? <Redirect to="/" /> : <SignIn />)}
            />
            <Route
              exact
              path="/auth/sign-up"
              render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
            />
            <Route
              exact
              path="/profile"
              render={() =>
                currentUser ? <Profile /> : <Redirect to="/auth/sign-in" />
              }
            />

            <Route
              exact
              path="/profile/settings"
              render={() =>
                currentUser ? (
                  <ProfileSettings />
                ) : (
                  <Redirect to="/auth/sign-in" />
                )
              }
            />

            <Route
              exact
              path="/profile/:type"
              render={() =>
                currentUser ? <ProfileData /> : <Redirect to="/auth/sign-in" />
              }
            />
          </Switch>
        </ScrollToTop>
      </div>
    );
  }
}

interface LinkDispatchProps {
  getUserSavedStartAsync: (email: string, token: string) => void;
  getUserLikedStartAsync: (email: string, token: string) => void;
  getUserDislikedStartAsync: (email: string, token: string) => void;
  getUserHiddenStartAsync: (email: string, token: string) => void;
  getUserSearchesStartAsync: (email: string, token: string) => void;
  getCurrentUserStartAsync: (email: string, token: string) => void;
}

interface LinkStateProps {
  userAuthorization: Authorization;
  userCategory: string;
  userCountry: string;
  currentUser: User;
}

const mapStateToProps = createStructuredSelector({
  userAuthorization: selectUserAuthorization,
  userCategory: selectUserCategory,
  userCountry: selectUserCountry,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  getUserSavedStartAsync: (email, token) =>
    dispatch(getUserSavedStartAsync(email, token)),
  getUserLikedStartAsync: (email, token) =>
    dispatch(getUserLikedStartAsync(email, token)),
  getUserDislikedStartAsync: (email, token) =>
    dispatch(getUserDislikedStartAsync(email, token)),
  getUserHiddenStartAsync: (email, token) =>
    dispatch(getUserHiddenStartAsync(email, token)),
  getUserSearchesStartAsync: (email, token) =>
    dispatch(getUserSearchesStartAsync(email, token)),
  getCurrentUserStartAsync: (email, token) =>
    dispatch(getCurrentUserStartAsync(email, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
