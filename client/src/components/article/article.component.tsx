import React from 'react';

import defaultArticle from '../../assets/article-default.png';

import { News } from '../../redux/news/news.types';

import './article.styles.scss';
import { createStructuredSelector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../redux/store';
import { connect } from 'react-redux';
import {
  selectUserSaved,
  selectCurrentUser,
  selectUserLiked,
  selectUserDisliked,
} from '../../redux/user/user.selectors';
import { User, UserNews } from '../../redux/user/user.types';
import {
  postUserSavedStartAsync,
  deleteUserSavedStartAsync,
  postUserLikedStartAsync,
  deleteUserLikedStartAsync,
  postUserDislikedStartAsync,
  deleteUserDislikedStartAsync,
} from '../../redux/user/user.actions';

interface ArticleProps {
  id: number;
}

type Props = ArticleProps & News & LinkStateProps & LinkDispatchProps;

class Article extends React.Component<Props> {
  handleSaved = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const { currentUser } = this.props;

    if (currentUser) {
      const {
        postUserSavedStartAsync,
        deleteUserSavedStartAsync,

        userSaved,

        currentUser: { email },

        title,
        description,
        content,
        urlToImage,
        publishedAt,
        url,
        source: { name: sourceName },
      } = this.props;

      const userSavedDuplicate =
        userSaved.find((item) => item.title === title) || {};

      Object.keys(userSavedDuplicate).length === 0
        ? postUserSavedStartAsync({
            email,
            sourceName,
            title,
            description,
            url,
            urlToImage,
            publishedAt,
            content,
          })
        : deleteUserSavedStartAsync(email, title);
    } else {
      // Toast.fail('Please sign in to add to collection!', 1000);
    }
  };

  handleLiked = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const { currentUser } = this.props;

    if (currentUser) {
      const {
        postUserLikedStartAsync,
        deleteUserLikedStartAsync,

        deleteUserDislikedStartAsync,

        userLiked,
        userDisliked,

        currentUser: { email },

        title,
        description,
        content,
        urlToImage,
        publishedAt,
        url,
        source: { name: sourceName },
      } = this.props;

      const userLikedDuplicate =
        userLiked.find((item) => item.title === title) || {};

      const userDislikedDuplicate =
        userDisliked.find((item) => item.title === title) || {};

      if (Object.keys(userDislikedDuplicate).length !== 0) {
        deleteUserDislikedStartAsync(email, title);
      }

      Object.keys(userLikedDuplicate).length === 0
        ? postUserLikedStartAsync({
            email,
            sourceName,
            title,
            description,
            url,
            urlToImage,
            publishedAt,
            content,
          })
        : deleteUserLikedStartAsync(email, title);
    } else {
      // Toast.fail('Please sign in to add to collection!', 1000);
    }
  };

  handleDisliked = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const { currentUser } = this.props;

    if (currentUser) {
      const {
        postUserDislikedStartAsync,
        deleteUserDislikedStartAsync,

        deleteUserLikedStartAsync,

        userLiked,
        userDisliked,

        currentUser: { email },

        title,
        description,
        content,
        urlToImage,
        publishedAt,
        url,
        source: { name: sourceName },
      } = this.props;

      const userDislikedDuplicate =
        userDisliked.find((item) => item.title === title) || {};

      const userLikedDuplicate =
        userLiked.find((item) => item.title === title) || {};

      if (Object.keys(userLikedDuplicate).length !== 0) {
        deleteUserLikedStartAsync(email, title);
      }

      Object.keys(userDislikedDuplicate).length === 0
        ? postUserDislikedStartAsync({
            email,
            sourceName,
            title,
            description,
            url,
            urlToImage,
            publishedAt,
            content,
          })
        : deleteUserDislikedStartAsync(email, title);
    } else {
      // Toast.fail('Please sign in to add to collection!', 1000);
    }
  };

  render(): JSX.Element {
    const {
      title,
      description,
      content,
      urlToImage,
      publishedAt,
      url,
      source: { name: sourceName },
      id,

      currentUser,

      userSaved,
      userLiked,
      userDisliked,
    } = this.props;

    const dateFormat = Math.round(
      (Date.now() - Date.parse(publishedAt)) / 3600000
    );

    const contentFiltered = content
      ? content.replace(/↵|<ul>|<li>|<\/li>|<\/ul>/g, '')
      : '';

    let userSavedBool, userLikedBool, userDislikedBool;

    if (currentUser) {
      userSavedBool = userSaved.some((item) => item.title === title);
      userLikedBool = userLiked.some((item) => item.title === title);
      userDislikedBool = userDisliked.some((item) => item.title === title);
    }

    // console.log(userSavedBool);

    return (
      <article className='article'>
        <div className='article__content'>
          <a
            className='article__content--title'
            href={url}
            target='_blank'
            rel='noopener noreferrer'
          >
            <h3 className='article__content--title--text'>{title}</h3>
          </a>

          <div className='article__content--source'>
            <a
              className='article__content--source--url'
              href={url}
              target='_blank'
              rel='noopener noreferrer'
            >
              {sourceName}
            </a>
            <div className='article__content--source--options'>
              &nbsp; &middot; {dateFormat} hours ago &nbsp; &middot;
              <button
                className={`article__content--source--options--save ${
                  userSavedBool
                    ? 'article__content--source--options--save--bool'
                    : ''
                }`}
                onClick={this.handleSaved}
              >
                <ion-icon
                  name={`bookmark${userSavedBool ? '' : '-outline'}`}
                ></ion-icon>
                <span
                  className={`article__content--source--options--save--info ${
                    userSavedBool
                      ? 'article__content--source--options--save--info--bool'
                      : ''
                  }`}
                >
                  {userSavedBool
                    ? 'Remove from saved stories'
                    : 'Save for later'}
                </span>
              </button>
              <a
                className='article__content--source--options--share'
                href='# '
                target='_blank'
                rel='noopener noreferrer'
              >
                <ion-icon name='share-social-outline'></ion-icon>
                <span className='article__content--source--options--share--info'>
                  Share
                </span>
              </a>
              <button
                className={`article__content--source--options--thumbs-up ${
                  userLikedBool
                    ? 'article__content--source--options--thumbs-up--bool'
                    : ''
                }`}
                onClick={this.handleLiked}
              >
                <ion-icon name='thumbs-up-sharp'></ion-icon>
                <span className='article__content--source--options--thumbs-up--info'>
                  {`${userLikedBool ? 'Less' : 'More'} stories like this`}
                </span>
              </button>
              <button
                className={`article__content--source--options--thumbs-down ${
                  userDislikedBool
                    ? 'article__content--source--options--thumbs-down--bool'
                    : ''
                }`}
                onClick={this.handleDisliked}
              >
                <ion-icon name='thumbs-down-sharp'></ion-icon>
                <span className='article__content--source--options--thumbs-down--info'>
                  {`${userDislikedBool ? 'More' : 'Less'} stories like this`}
                </span>
              </button>
              <a
                className='article__content--source--options--hide'
                href='# '
                target='_blank'
                rel='noopener noreferrer'
              >
                <ion-icon name='eye-off'></ion-icon>
                <span className='article__content--source--options--hide--info'>
                  Hide all stories from {sourceName}
                </span>
              </a>
            </div>
          </div>
          {description || description ? (
            <div className='article__content--description'>
              <input
                type='checkbox'
                className='article__content--description--state'
                id={`article-dropdown-${id}`}
              />
              <p className='article__content--description--content'>
                {description ? description : contentFiltered.split('[+')[0]}
              </p>

              <label
                htmlFor={`article-dropdown-${id}`}
                className='article__content--description--toggle'
              >
                <ion-icon name='chevron-down-outline'></ion-icon>
              </label>
            </div>
          ) : null}

          <a
            className='article__content--coverage'
            href={url}
            target='_blank'
            rel='noopener noreferrer'
          >
            <ion-icon name='newspaper-outline'></ion-icon>
            View Full Coverage
          </a>
        </div>
        <a
          className='article__image-container'
          href={url}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className='article__image-container--image'
            src={urlToImage || defaultArticle}
            alt='Article'
          ></img>
        </a>
      </article>
    );
  }
}

interface LinkStateProps {
  currentUser: User;
  userSaved: News[];
  userLiked: News[];
  userDisliked: News[];
}

interface LinkDispatchProps {
  postUserSavedStartAsync: (userNews: UserNews) => void;
  deleteUserSavedStartAsync: (email: string, title: string) => void;

  postUserLikedStartAsync: (userNews: UserNews) => void;
  deleteUserLikedStartAsync: (email: string, title: string) => void;

  postUserDislikedStartAsync: (userNews: UserNews) => void;
  deleteUserDislikedStartAsync: (email: string, title: string) => void;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userSaved: selectUserSaved,
  userLiked: selectUserLiked,
  userDisliked: selectUserDisliked,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  postUserSavedStartAsync: (userNews) =>
    dispatch(postUserSavedStartAsync(userNews)),
  deleteUserSavedStartAsync: (email, title) =>
    dispatch(deleteUserSavedStartAsync(email, title)),

  postUserLikedStartAsync: (userNews) =>
    dispatch(postUserLikedStartAsync(userNews)),
  deleteUserLikedStartAsync: (email, title) =>
    dispatch(deleteUserLikedStartAsync(email, title)),

  postUserDislikedStartAsync: (userNews) =>
    dispatch(postUserDislikedStartAsync(userNews)),
  deleteUserDislikedStartAsync: (email, title) =>
    dispatch(deleteUserDislikedStartAsync(email, title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
