import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Article from '../../components/article/article.component';
import { News } from '../../redux/news/news.types';
import {
  selectUserDisliked,
  selectUserHidden,
  selectUserLiked,
  selectUserSaved,
} from '../../redux/user/user.selectors';

import './profile-data.styles.scss';

interface ProfileDataProps {
  match: {
    params: {
      type: string;
    };
  };
}

type Props = LinkStateProps & ProfileDataProps;

const ProfileData: React.FunctionComponent<Props> = ({
  match: {
    params: { type },
  },
  userSaved,
  userLiked,
  userDisliked,
  userHidden,
}): JSX.Element => {
  let newsArticles =
    type === 'saved-stories'
      ? userSaved
      : type === 'liked-stories'
      ? userLiked
      : type === 'disliked-stories'
      ? userDisliked
      : // : type === 'past-searches'
        // ? userDisliked
        // : type === 'hidden-sources'
        // ? userHidden
        [];

  let newsItems =
    type === 'past-searches'
      ? userDisliked
      : type === 'hidden-sources'
      ? userHidden
      : [];

  const subHeader = newsArticles.length
    ? `You can find here all the stories that you ${
        type.toLowerCase().split('-')[0]
      } in the past.`
    : type === 'past-searches'
    ? 'You can find here all your past news searches.'
    : type === 'hidden-sources'
    ? 'You can find here all the news sources that you hidden in the past.'
    : '';

  // console.log(type);
  // console.log(newsArticles);
  // console.log(userHidden);

  return (
    <div className='profile-data'>
      <div className='profile-data__content'>
        <h2 className='profile-data__content--header'>{`${
          type.slice(0, 1).toUpperCase() +
          type.slice(1).toLowerCase().replace('-', ' ')
        } `}</h2>
        <h4 className='profile-data__content--sub-header'>{subHeader}</h4>

        {newsArticles.length ? (
          <div className='profile-data__content--articles'>
            {newsArticles.map((x: News, i: number) => (
              <Article key={`${i + type}`} {...x} id={`${i + type}`} />
            ))}
          </div>
        ) : null}

        {newsItems.length ? (
          <div className='profile-data__content--articles'>
            {newsItems.map((x: string, i: number) => (
              <div>{x}</div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

interface LinkStateProps {
  userSaved: News[];
  userLiked: News[];
  userDisliked: News[];
  userHidden: [string];
}

const mapStateToProps = createStructuredSelector({
  userSaved: selectUserSaved,
  userLiked: selectUserLiked,
  userDisliked: selectUserDisliked,
  userHidden: selectUserHidden,
});

export default withRouter(connect(mapStateToProps)(ProfileData));
