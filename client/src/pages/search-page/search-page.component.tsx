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

class SearchPage extends React.Component<Props> {
  componentDidMount() {
    const {
      match: {
        params: { query, queryTitle, date, lang, sortBy },
      },
      fetchNewsSearchStartAsync,
    } = this.props;

    const queryFormatted = query.replace(/ /g, '%20');
    const titleBool = queryTitle === 'true';
    const dateFormatted = date === 'anytime' ? '' : date;
    const langFormatted = lang === 'us' ? 'en' : 'ro';

    fetchNewsSearchStartAsync({
      query: queryFormatted,
      queryTitle: titleBool,
      date: dateFormatted,
      lang: langFormatted,
      sortBy,
    });
  }

  // Checks if the component received new props and refetches data
  componentDidUpdate(prevProps: SearchPageProps) {
    const {
      match: {
        params: { query, queryTitle, date, lang, sortBy },
      },
      fetchNewsSearchStartAsync,
    } = this.props;

    if (
      query !== prevProps.match.params.query ||
      queryTitle !== prevProps.match.params.queryTitle ||
      date !== prevProps.match.params.date ||
      lang !== prevProps.match.params.lang ||
      sortBy !== prevProps.match.params.sortBy
    ) {
      const queryFormatted = query.replace(/ /g, '%20');
      const titleBool = queryTitle === 'true';
      const dateFormatted = date === 'anytime' ? '' : date;
      const langFormatted = lang === 'us' ? 'en' : 'ro';

      fetchNewsSearchStartAsync({
        query: queryFormatted,
        queryTitle: titleBool,
        date: dateFormatted,
        lang: langFormatted,
        sortBy,
      });
    }
  }

  render() {
    // console.log(query);

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

    const {
      match: {
        params: { query },
      },
      newsSearch,
    } = this.props;

    // console.log(newsSearch.length);

    return (
      <div className='search-page'>
        {newsSearch.length ? (
          <div className='search-page__content'>
            <h2 className='search-page__content--header'>
              Search results for:
            </h2>
            <h4 className='search-page__content--sub-header'>"{query}"</h4>

            <div className='search-page__content--articles'>
              {newsSearch.map((x: News, i: number) => (
                <Article key={`${i + query}`} {...x} id={`${i + query}`} />
              ))}
            </div>
          </div>
        ) : (
          <div className='search-page__content'>
            <h2 className='search-page__content--header search-page__content--header--none'>
              No search results found for:
            </h2>
            <h4 className='search-page__content--sub-header'>"{query}"</h4>
          </div>
        )}
      </div>
    );
  }
}

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
