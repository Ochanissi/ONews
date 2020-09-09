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
} from '../../redux/user/user.selectors';
import { User, UserNews } from '../../redux/user/user.types';
import {
  postUserSavedStartAsync,
  deleteUserSavedStartAsync,
} from '../../redux/user/user.actions';

interface ArticleProps {
  id: number;
}

type Props = ArticleProps & News & LinkStateProps & LinkDispatchProps;

class Article extends React.Component<Props> {
  handleSaved = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const { currentUser } = this.props;

    // console.log(currentUser);

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

      // console.log(userSavedDuplicate);

      // console.log({ id, email, type, itemTitle, url, vote_average });

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
    } = this.props;

    const dateFormat = Math.round(
      (Date.now() - Date.parse(publishedAt)) / 3600000
    );

    const contentFiltered = content
      ? content.replace(/↵|<ul>|<li>|<\/li>|<\/ul>/g, '')
      : '';

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
                className='article__content--source--options--save'
                onClick={this.handleSaved}
              >
                <ion-icon name='bookmark-outline'></ion-icon>
                <span className='article__content--source--options--save--info'>
                  Save for later
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
              <a
                className='article__content--source--options--thumbs-up'
                href='# '
                target='_blank'
                rel='noopener noreferrer'
              >
                <ion-icon name='thumbs-up-sharp'></ion-icon>
                <span className='article__content--source--options--thumbs-up--info'>
                  More stories like this
                </span>
              </a>
              <a
                className='article__content--source--options--thumbs-down'
                href='# '
                target='_blank'
                rel='noopener noreferrer'
              >
                <ion-icon name='thumbs-down-sharp'></ion-icon>
                <span className='article__content--source--options--thumbs-down--info'>
                  Less stories like this
                </span>
              </a>
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
}

interface LinkDispatchProps {
  postUserSavedStartAsync: ({
    email,
    sourceName,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
  }: UserNews) => void;
  deleteUserSavedStartAsync: (email: string, title: string) => void;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userSaved: selectUserSaved,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  postUserSavedStartAsync: ({
    email,
    sourceName,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
  }) =>
    dispatch(
      postUserSavedStartAsync({
        email,
        sourceName,
        title,
        description,
        url,
        urlToImage,
        publishedAt,
        content,
      })
    ),
  deleteUserSavedStartAsync: (email, title) =>
    dispatch(deleteUserSavedStartAsync(email, title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
