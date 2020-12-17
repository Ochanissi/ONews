import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import {
  selectUserCategory,
  selectUserCountry,
  selectCurrentUser,
  selectUserAuthorization,
} from './redux/user/user.selectors';

import './App.scss';

import { Authorization, User } from './redux/user/user.types';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from './redux/store';
import {
  getCurrentUserStartAsync,
  getUserDislikedStartAsync,
  getUserHiddenStartAsync,
  getUserLikedStartAsync,
  getUserSavedStartAsync,
  getUserSearchesStartAsync,
  setUserSidebarMenu,
  setUserWeatherMenu,
} from './redux/user/user.actions';

// Pages
// import HomePage from './pages/home-page/home-page.component';
// import SearchPage from './pages/search-page/search-page.component';
// import SignUp from './pages/sign-up/sign-up.component';
// import SignIn from './pages/sign-in/sign-in.component';
// import Profile from './pages/profile/profile.component';
// import ProfileData from './pages/profile-data/profile-data.component';
// import ProfileSettings from './pages/profile-settings/profile-settings.components';

// Components
import NavBar from './components/navbar/navbar.component';
import BackToTop from './components/back-to-top/back-to-top.component';
import ScrollToTop from './components/scroll-to-top/scroll-to-top.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/home-page/home-page.component'));
const SearchPage = lazy(
  () => import('./pages/search-page/search-page.component')
);
const SignUp = lazy(() => import('./pages/sign-up/sign-up.component'));
const SignIn = lazy(() => import('./pages/sign-in/sign-in.component'));
const Profile = lazy(() => import('./pages/profile/profile.component'));
const ProfileData = lazy(
  () => import('./pages/profile-data/profile-data.component')
);
const ProfileSettings = lazy(
  () => import('./pages/profile-settings/profile-settings.components')
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': { name: string };
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

    const { setUserSidebarMenu, setUserWeatherMenu } = this.props;

    if (window.innerWidth <= 1000) {
      setUserSidebarMenu(false);
    } else {
      setUserSidebarMenu(true);
    }

    if (window.innerWidth <= 800) {
      setUserWeatherMenu(false);
    } else {
      setUserWeatherMenu(true);
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

          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Redirect to={`/news/${userCountry}/${userCategory}`} />
                  )}
                />
                <Route
                  exact
                  path="/news/:country/:category"
                  component={HomePage}
                />
                <Route
                  exact
                  path="/search/:query/:queryTitle/:date/:lang/:sortBy"
                  component={SearchPage}
                />
                <Route
                  exact
                  path="/auth/sign-in"
                  render={() =>
                    currentUser ? <Redirect to="/" /> : <SignIn />
                  }
                />
                <Route
                  exact
                  path="/auth/sign-up"
                  render={() =>
                    currentUser ? <Redirect to="/" /> : <SignUp />
                  }
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
                    currentUser ? (
                      <ProfileData />
                    ) : (
                      <Redirect to="/auth/sign-in" />
                    )
                  }
                />
              </Switch>
            </Suspense>
          </ErrorBoundary>
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

  setUserSidebarMenu: (bool: boolean) => void;
  setUserWeatherMenu: (bool: boolean) => void;
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

  setUserSidebarMenu: (bool) => dispatch(setUserSidebarMenu(bool)),
  setUserWeatherMenu: (bool) => dispatch(setUserWeatherMenu(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
