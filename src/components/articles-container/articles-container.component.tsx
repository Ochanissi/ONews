import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectNewsArticles } from '../../redux/news/news.selectors';

import { fetchNewsStartAsync } from '../../redux/news/news.actions';
import { AppActions } from '../../redux/store';

import { ThunkDispatch } from 'redux-thunk';

import { News } from '../../redux/news/news.types';

import Article from '../article/article.component';

import './articles-container.styles.scss';

interface ArticlesContainerProps {}

interface ArticlesContainerState {}

type Props = ArticlesContainerProps & LinkDispatchProps & LinkStateProps;

class ArticlesContainer extends React.Component<Props, ArticlesContainerState> {
  componentDidMount() {
    const { fetchNewsStartAsync } = this.props;

    fetchNewsStartAsync();
  }

  render() {
    const { newsArticles = [] } = this.props;

    console.log(newsArticles);

    return (
      <div className='articles-container'>
        <h2 className='articles-container__header'>Top Stories</h2>
        <h4 className='articles-container__sub-header'>
          View the latest news and top headlines!
        </h4>

        <div className='articles-container__content'>
          {newsArticles.map((x: News, i: number) => (
            <Article key={i} {...x} id={i} />
          ))}
        </div>
      </div>
    );
  }
}

export interface LinkStateProps {
  newsArticles: News[];
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer);
