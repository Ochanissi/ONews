import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectNewsArticles } from '../../redux/news/news.selectors';

import { fetchNewsStartAsync } from '../../redux/news/news.actions';
import { setUserCategory } from '../../redux/user/user.actions';
import { AppActions } from '../../redux/store';

import { ThunkDispatch } from 'redux-thunk';

import { News } from '../../redux/news/news.types';

import Article from '../../components/article/article.component';

import './home-page.styles.scss';

interface HomePageProps {
  match: {
    params: {
      category: string;
      country: string;
    };
  };
}

type Props = HomePageProps & LinkDispatchProps & LinkStateProps;

class HomePage extends React.Component<Props> {
  componentDidMount() {
    const {
      category: newsCategory,
      country: newsCountry,
    } = this.props.match.params;

    const { fetchNewsStartAsync } = this.props;

    fetchNewsStartAsync(newsCountry, newsCategory);
  }

  // Checks if the component received new props and refetches data
  componentDidUpdate(prevProps: Props) {
    const {
      category: newsCategory,
      country: newsCountry,
    } = this.props.match.params;

    const { fetchNewsStartAsync, setUserCategory } = this.props;

    if (
      newsCountry !== prevProps.match.params.country &&
      newsCategory !== prevProps.match.params.category
    ) {
      fetchNewsStartAsync(newsCountry, newsCategory);
      setUserCategory(newsCategory);
      // to be set setUserCountry
    } else if (newsCountry !== prevProps.match.params.country) {
      fetchNewsStartAsync(newsCountry, newsCategory);
      // to be set setUserCountry
    } else if (newsCategory !== prevProps.match.params.category) {
      fetchNewsStartAsync(newsCountry, newsCategory);
      setUserCategory(newsCategory);
    }
  }

  render() {
    const { newsArticles } = this.props;

    // console.log(newsArticles);

    return (
      <div className='homepage'>
        <div className='homepage__content'>
          <h2 className='homepage__content--header'>Top Stories</h2>
          <h4 className='homepage__content--sub-header'>
            View the latest news and top headlines!
          </h4>

          <div className='homepage__content--articles'>
            {newsArticles.map((x: News, i: number) => (
              <Article key={i} {...x} id={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

interface LinkStateProps {
  newsArticles: News[];
}

interface LinkDispatchProps {
  fetchNewsStartAsync: (country: string, category: string) => void;
  setUserCategory: (category: string) => void;
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
  fetchNewsStartAsync: (country, category) =>
    dispatch(fetchNewsStartAsync(country, category)),

  setUserCategory: (category) => dispatch(setUserCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
