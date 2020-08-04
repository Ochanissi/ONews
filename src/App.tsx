import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectNewsArticles } from './redux/news/news.selectors';

import { fetchNewsStartAsync } from './redux/news/news.actions';
import { AppActions } from './redux/store';

import { ThunkDispatch } from 'redux-thunk';

import './App.scss';

import HomePage from './pages/home-page/home-page.component';
import NavBar from './components/navbar/navbar.component';
import Sidebar from './components/sidebar/sidebar.component';
import { News } from './redux/news/news.types';
// import { setCurrentUser } from './redux/user/user.actions';

interface AppProps {}

interface AppState {}

type Props = AppProps & LinkDispatchProps & LinkStateProps;

class App extends React.Component<Props, AppState> {
  componentDidMount() {
    const { fetchNewsStartAsync } = this.props;

    fetchNewsStartAsync();
  }

  render() {
    const { newsArticles } = this.props;

    console.log(newsArticles);

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

export interface LinkStateProps {
  newsArticles: News;
}

interface LinkDispatchProps {
  fetchNewsStartAsync: () => void;
}

const mapStateToProps = createStructuredSelector({
  newsArticles: selectNewsArticles,
});

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
// });

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  fetchNewsStartAsync: () => dispatch(fetchNewsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
