import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectNewsArticles } from '../../redux/news/news.selectors';

import { fetchNewsStartAsync } from '../../redux/news/news.actions';
import { setUserCategory, setUserCountry } from '../../redux/user/user.actions';
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

    const { fetchNewsStartAsync, setUserCategory, setUserCountry } = this.props;

    fetchNewsStartAsync(newsCountry, newsCategory);
    setUserCategory(newsCategory);
    setUserCountry(newsCountry);

    // console.log(newsCategory);
  }

  // Checks if the component received new props and refetches data
  componentDidUpdate(prevProps: Props) {
    const {
      category: newsCategory,
      country: newsCountry,
    } = this.props.match.params;

    const { fetchNewsStartAsync, setUserCategory, setUserCountry } = this.props;

    if (
      newsCountry !== prevProps.match.params.country &&
      newsCategory !== prevProps.match.params.category
    ) {
      fetchNewsStartAsync(newsCountry, newsCategory);
      setUserCategory(newsCategory);
      setUserCountry(newsCountry);
    } else if (newsCountry !== prevProps.match.params.country) {
      fetchNewsStartAsync(newsCountry, newsCategory);
      setUserCountry(newsCountry);
    } else if (newsCategory !== prevProps.match.params.category) {
      fetchNewsStartAsync(newsCountry, newsCategory);
      setUserCategory(newsCategory);
    }
  }

  handleSubheader = (category: string) => {
    switch (category) {
      case 'general':
        return 'View the latest news and top headlines!';
      case 'business':
        return 'Latest headlines for business news around the world!';
      case 'technology':
        return 'Keep up to date on the latest developments in the tech industry!';
      case 'entertainment':
        return 'Get the latest news on celebrity scandals, engagements, and divorces!';
      case 'science':
        return "The world's leading outlet for cutting-edge research in all areas of science!";
      case 'sports':
        return 'Keeping you up to date on the latest sports news from Romania and the World!';
      case 'health':
        return 'View the latest health news and explore articles on fitness, diet, nutrition and healthy living!';

      default:
        return 'View the latest news and top headlines!';
    }
  };

  render() {
    const { newsArticles } = this.props;
    const { category: newsCategory } = this.props.match.params;

    const subHeader = this.handleSubheader(newsCategory);

    // console.log(newsArticles);

    return (
      <div className='homepage'>
        <div className='homepage__content'>
          <h2 className='homepage__content--header'>
            {newsCategory === 'general'
              ? 'Top Stories'
              : `${
                  newsCategory.slice(0, 1).toUpperCase() + newsCategory.slice(1)
                } News`}
          </h2>
          <h4 className='homepage__content--sub-header'>{subHeader}</h4>

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
  setUserCountry: (country: string) => void;
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
  setUserCountry: (country) => dispatch(setUserCountry(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
