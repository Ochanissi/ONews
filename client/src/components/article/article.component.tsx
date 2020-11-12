import React from "react";

import defaultArticle from "../../assets/article-default.png";

import { News } from "../../redux/news/news.types";

import "./article.styles.scss";
import { createStructuredSelector } from "reselect";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../redux/store";
import { connect } from "react-redux";
import {
  selectUserSaved,
  selectCurrentUser,
  selectUserLiked,
  selectUserDisliked,
  selectUserHidden,
  selectUserAuthorization,
} from "../../redux/user/user.selectors";
import { Authorization, User, UserNews } from "../../redux/user/user.types";
import {
  postUserSavedStartAsync,
  deleteUserSavedStartAsync,
  postUserLikedStartAsync,
  deleteUserLikedStartAsync,
  postUserDislikedStartAsync,
  deleteUserDislikedStartAsync,
  postUserHiddenStartAsync,
  deleteUserHiddenStartAsync,
} from "../../redux/user/user.actions";

import Toast from "light-toast";

interface ArticleProps {
  id: string;
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

        userAuthorization: { email, token },

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
        ? postUserSavedStartAsync(
            {
              email,
              sourceName,
              title,
              description,
              url,
              urlToImage,
              publishedAt,
              content,
            },
            token
          )
        : deleteUserSavedStartAsync(email, title, token);
    } else {
      Toast.fail(
        "You need to be signed in to save for later! \n Please sign in!",
        1000
      );
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

        userAuthorization: { email, token },

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
        deleteUserDislikedStartAsync(email, title, token);
      }

      Object.keys(userLikedDuplicate).length === 0
        ? postUserLikedStartAsync(
            {
              email,
              sourceName,
              title,
              description,
              url,
              urlToImage,
              publishedAt,
              content,
            },
            token
          )
        : deleteUserLikedStartAsync(email, title, token);
    } else {
      Toast.fail(
        "You need to be signed in to like stories! \n Please sign in!",
        1000
      );
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

        userAuthorization: { email, token },

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
        deleteUserLikedStartAsync(email, title, token);
      }

      Object.keys(userDislikedDuplicate).length === 0
        ? postUserDislikedStartAsync(
            {
              email,
              sourceName,
              title,
              description,
              url,
              urlToImage,
              publishedAt,
              content,
            },
            token
          )
        : deleteUserDislikedStartAsync(email, title, token);
    } else {
      Toast.fail(
        "You need to be signed in to dislike stories! \n Please sign in!",
        1000
      );
    }
  };

  handleHidden = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const { currentUser } = this.props;

    if (currentUser) {
      const {
        postUserHiddenStartAsync,
        deleteUserHiddenStartAsync,

        userHidden,

        userAuthorization: { email, token },

        source: { name: sourceName },
      } = this.props;

      const userHiddenDuplicate =
        userHidden.find((item) => item === sourceName) || {};

      Object.keys(userHiddenDuplicate).length === 0
        ? postUserHiddenStartAsync(email, sourceName, token)
        : deleteUserHiddenStartAsync(email, sourceName, token);
    } else {
      Toast.fail(
        "You need to be signed in to hide stories! \n Please sign in!",
        1000
      );
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
      userHidden,
    } = this.props;

    const dateFormatMins = Math.round(
      (Date.now() - Date.parse(publishedAt)) / 60000
    );
    const dateFormatHours = Math.round(
      (Date.now() - Date.parse(publishedAt)) / 3600000
    );
    const dateFormatDays = Math.round(
      (Date.now() - Date.parse(publishedAt)) / 86400000
    );

    const dateFormat =
      dateFormatMins < 60
        ? `${dateFormatMins} minute${dateFormatMins > 1 ? "s" : ""} ago`
        : dateFormatHours < 24
        ? `${dateFormatHours} hour${dateFormatHours > 1 ? "s" : ""} ago`
        : `${dateFormatDays} day${dateFormatDays > 1 ? "s" : ""} ago`;

    const contentFiltered = content
      ? content.replace(/↵|<ul>|<li>|<\/li>|<\/ul>/g, "")
      : "";

    let userSavedBool, userLikedBool, userDislikedBool, userHiddenBool;

    if (currentUser) {
      userSavedBool = userSaved.some((item) => item.title === title);
      userLikedBool = userLiked.some((item) => item.title === title);
      userDislikedBool = userDisliked.some((item) => item.title === title);
      userHiddenBool = userHidden.some((item) => item === sourceName);
    }

    // console.log(userSavedBool);

    // console.log(id);

    const userHiddenDuplicate =
      userHidden.find((item) => item === sourceName) || {};

    if (Object.keys(userHiddenDuplicate).length === 0) {
      return (
        <article className="article">
          <div className="article__content">
            <a
              className="article__content--title"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="article__content--title--text">{title}</h3>
            </a>

            <div className="article__content--source">
              <a
                className="article__content--source--url"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {sourceName}
              </a>
              <div className="article__content--source--options">
                &nbsp; &middot; {dateFormat} &nbsp; &middot;
                <button
                  className={`article__content--source--options--save ${
                    userSavedBool
                      ? "article__content--source--options--save--bool"
                      : ""
                  }`}
                  onClick={this.handleSaved}
                >
                  <ion-icon
                    name={`bookmark${userSavedBool ? "" : "-outline"}`}
                  ></ion-icon>
                  <span
                    className={`article__content--source--options--save--info ${
                      userSavedBool
                        ? "article__content--source--options--save--info--bool"
                        : ""
                    }`}
                  >
                    {userSavedBool
                      ? "Remove from saved stories"
                      : "Save for later"}
                  </span>
                </button>
                <a
                  className="article__content--source--options--share"
                  href="# "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ion-icon name="share-social-outline"></ion-icon>
                  <span className="article__content--source--options--share--info">
                    Share
                  </span>
                </a>
                <button
                  className={`article__content--source--options--thumbs-up ${
                    userLikedBool
                      ? "article__content--source--options--thumbs-up--bool"
                      : ""
                  }`}
                  onClick={this.handleLiked}
                >
                  <ion-icon name="thumbs-up-sharp"></ion-icon>
                  <span className="article__content--source--options--thumbs-up--info">
                    {`${userLikedBool ? "Less" : "More"} stories like this`}
                  </span>
                </button>
                <button
                  className={`article__content--source--options--thumbs-down ${
                    userDislikedBool
                      ? "article__content--source--options--thumbs-down--bool"
                      : ""
                  }`}
                  onClick={this.handleDisliked}
                >
                  <ion-icon name="thumbs-down-sharp"></ion-icon>
                  <span className="article__content--source--options--thumbs-down--info">
                    {`${userDislikedBool ? "More" : "Less"} stories like this`}
                  </span>
                </button>
                <button
                  className={`article__content--source--options--hide ${
                    userHiddenBool
                      ? "article__content--source--options--hide--bool"
                      : ""
                  }`}
                  onClick={this.handleHidden}
                >
                  <ion-icon name="eye-off"></ion-icon>
                  <span className="article__content--source--options--hide--info">
                    {`${
                      userHiddenBool ? "Show" : "Hide"
                    } all stories from ${sourceName}`}
                  </span>
                </button>
              </div>
            </div>
            {description || description ? (
              <div className="article__content--description">
                <input
                  type="checkbox"
                  className="article__content--description--state"
                  id={`article-dropdown-${id}`}
                />
                <p className="article__content--description--content">
                  {description ? description : contentFiltered.split("[+")[0]}
                </p>

                <label
                  htmlFor={`article-dropdown-${id}`}
                  className="article__content--description--toggle"
                >
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </label>
              </div>
            ) : null}

            <a
              className="article__content--coverage"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ion-icon name="newspaper-outline"></ion-icon>
              View Full Coverage
            </a>
          </div>
          <a
            className="article__image-container"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="article__image-container--image"
              src={urlToImage || defaultArticle}
              alt="Article"
            ></img>
          </a>
        </article>
      );
    } else {
      return null as any;
    }
  }
}

interface LinkStateProps {
  userAuthorization: Authorization;
  currentUser: User;
  userSaved: News[];
  userLiked: News[];
  userDisliked: News[];
  userHidden: [string];
}

interface LinkDispatchProps {
  postUserSavedStartAsync: (userNews: UserNews, token: string) => void;
  deleteUserSavedStartAsync: (
    email: string,
    title: string,
    token: string
  ) => void;

  postUserLikedStartAsync: (userNews: UserNews, token: string) => void;
  deleteUserLikedStartAsync: (
    email: string,
    title: string,
    token: string
  ) => void;

  postUserDislikedStartAsync: (userNews: UserNews, token: string) => void;
  deleteUserDislikedStartAsync: (
    email: string,
    title: string,
    token: string
  ) => void;

  postUserHiddenStartAsync: (
    email: string,
    sourceName: string,
    token: string
  ) => void;
  deleteUserHiddenStartAsync: (
    email: string,
    sourceName: string,
    token: string
  ) => void;
}

const mapStateToProps = createStructuredSelector({
  userAuthorization: selectUserAuthorization,
  currentUser: selectCurrentUser,
  userSaved: selectUserSaved,
  userLiked: selectUserLiked,
  userDisliked: selectUserDisliked,
  userHidden: selectUserHidden,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  postUserSavedStartAsync: (userNews, token) =>
    dispatch(postUserSavedStartAsync(userNews, token)),
  deleteUserSavedStartAsync: (email, title, token) =>
    dispatch(deleteUserSavedStartAsync(email, title, token)),

  postUserLikedStartAsync: (userNews, token) =>
    dispatch(postUserLikedStartAsync(userNews, token)),
  deleteUserLikedStartAsync: (email, title, token) =>
    dispatch(deleteUserLikedStartAsync(email, title, token)),

  postUserDislikedStartAsync: (userNews, token) =>
    dispatch(postUserDislikedStartAsync(userNews, token)),
  deleteUserDislikedStartAsync: (email, title, token) =>
    dispatch(deleteUserDislikedStartAsync(email, title, token)),

  postUserHiddenStartAsync: (email, sourceName, token) =>
    dispatch(postUserHiddenStartAsync(email, sourceName, token)),
  deleteUserHiddenStartAsync: (email, sourceName, token) =>
    dispatch(deleteUserHiddenStartAsync(email, sourceName, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
