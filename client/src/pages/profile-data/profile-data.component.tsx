import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Article from '../../components/article/article.component';
import { News } from '../../redux/news/news.types';
import {
  selectUserDisliked,
  selectUserLiked,
  selectUserSaved,
} from '../../redux/user/user.selectors';

import './profile-data.styles.scss';

interface ProfileData {
  match: {
    params: {
      type: string;
    };
  };
}

type Props = LinkStateProps & ProfileData;

const ProfileData: React.FunctionComponent<Props> = ({
  match: {
    params: { type },
  },
  userSaved,
  userLiked,
  userDisliked,
}): JSX.Element => {
  let newsArticles =
    type === 'saved'
      ? userSaved
      : type === 'liked'
      ? userLiked
      : type === 'disliked'
      ? userDisliked
      : [];

  // console.log(type);
  // console.log(newsArticles);

  return (
    <div className='profile-data'>
      <div className='profile-data__content'>
        <h2 className='profile-data__content--header'>{`${
          type.slice(0, 1).toUpperCase() + type.slice(1).toLowerCase()
        } stories`}</h2>
        <h4 className='profile-data__content--sub-header'>{`You can find here all the stories that you ${type.toLowerCase()} in the past.`}</h4>

        <div className='profile-data__content--articles'>
          {newsArticles.map((x: News, i: number) => (
            <Article key={`${i + type}`} {...x} id={`${i + type}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface LinkStateProps {
  userSaved: News[];
  userLiked: News[];
  userDisliked: News[];
}

const mapStateToProps = createStructuredSelector({
  userSaved: selectUserSaved,
  userLiked: selectUserLiked,
  userDisliked: selectUserDisliked,
});

export default withRouter(connect(mapStateToProps)(ProfileData));
