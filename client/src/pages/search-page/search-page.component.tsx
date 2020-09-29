import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Article from '../../components/article/article.component';
import { News, NewsSearch } from '../../redux/news/news.types';
import { selectNewsSearch } from '../../redux/news/news.selectors';

import './search-page.styles.scss';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../redux/store';
import { fetchNewsSearchStartAsync } from '../../redux/news/news.actions';

interface SearchPageProps {
  match: {
    params: {
      query: string;
      queryTitle: string;
      date: string;
      lang: string;
      sortBy: string;
    };
  };
}

type Props = LinkStateProps & SearchPageProps & LinkDispatchProps;

const SearchPage: React.FunctionComponent<Props> = ({
  match: {
    params: { query, queryTitle, date, lang, sortBy },
  },
  newsSearch,
  fetchNewsSearchStartAsync,
}): JSX.Element => {
  // console.log({ query, queryTitle, date, lang, sortBy });
  // console.log(query.replace(/%20/g, ' '));

  // const { fetchNewsSearchStartAsync } = this.props;

  // fetchNewsSearchStartAsync({
  //   query,
  //   queryTitle,
  //   date,
  //   lang,
  //   sortBy,
  // });

  console.log(query);

  return (
    <div className='search-page'>
      <div className='search-page__content'>
        <h2 className='search-page__content--header'>Search news</h2>
        <h4 className='search-page__content--sub-header'>
          Results for: {query.replace(/%20/g, ' ')}
        </h4>

        <div className='search-page__content--articles'>
          {newsSearch.map((x: News, i: number) => (
            <Article key={`${i + query}`} {...x} id={`${i + query}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface LinkStateProps {
  newsSearch: News[];
}

interface LinkDispatchProps {
  fetchNewsSearchStartAsync: (newsSearch: NewsSearch) => void;
}

const mapStateToProps = createStructuredSelector({
  newsSearch: selectNewsSearch,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  fetchNewsSearchStartAsync: (newsSearch) =>
    dispatch(fetchNewsSearchStartAsync(newsSearch)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchPage)
);
