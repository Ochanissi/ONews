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
import ArticleShare from "../article-share/article-share.component";
import MediaQuery from "react-responsive";

interface ArticleProps {
  id: string;
}

interface ArticleState {
  shareToggle: boolean;
}

type Props = ArticleProps & News & LinkStateProps & LinkDispatchProps;

class Article extends React.Component<Props, ArticleState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shareToggle: false,
    };
  }

  // Checks for mouse clicks
  componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
  }

  // Handles the Article Share Modal - Opens / Closes
  handleClick = (event: any): void => {
    // event.preventDefault();

    // console.log(event.target.className);
    // console.log(event.target.parentNode.className);

    const defaultClick = event.target.className || "";
    const defaultClickParent = event.target.parentNode
      ? event.target.parentNode.className
      : "";

    if (
      defaultClick === "article-share" ||
      defaultClickParent === "article-share__close"
    ) {
      this.setState({ shareToggle: false });
    }
  };

  // Handles the Article Share Modal - Opens / Closes
  handleShare = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    this.setState({ shareToggle: true });
  };

  // Posts / Deletes the story to saved for later
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

  // Posts / Deletes the story to liked
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
        deleteUserDislikedStartAsync(email, title, token, false);
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

  // Posts / Deletes the story to disliked
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
        deleteUserLikedStartAsync(email, title, token, false);
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

  // Posts / Deletes the story to hidden
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

    const { shareToggle } = this.state;

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

    const userHiddenDuplicate =
      userHidden.find((item) => item === sourceName) || {};

    if (Object.keys(userHiddenDuplicate).length === 0) {
      return (
        <article className="article">
          {shareToggle ? (
            <ArticleShare title={title} source={sourceName} url={url} />
          ) : null}

          <div className="article__bulk">
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
                <span className="article__content--source--date">
                  &nbsp; &middot; {dateFormat} &nbsp;
                  <MediaQuery minDeviceWidth={451}> &middot;</MediaQuery>
                </span>

                <div className="article__content--source--options">
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
                  <button
                    className="article__content--source--options--share"
                    onClick={this.handleShare}
                  >
                    <ion-icon name="share-social-outline"></ion-icon>
                    <span className="article__content--source--options--share--info">
                      Share
                    </span>
                  </button>
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
                      {`${
                        userDislikedBool ? "More" : "Less"
                      } stories like this`}
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
    token: string,
    bool?: boolean
  ) => void;

  postUserDislikedStartAsync: (userNews: UserNews, token: string) => void;
  deleteUserDislikedStartAsync: (
    email: string,
    title: string,
    token: string,
    bool?: boolean
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
  deleteUserLikedStartAsync: (email, title, token, bool) =>
    dispatch(deleteUserLikedStartAsync(email, title, token, bool)),

  postUserDislikedStartAsync: (userNews, token) =>
    dispatch(postUserDislikedStartAsync(userNews, token)),
  deleteUserDislikedStartAsync: (email, title, token, bool) =>
    dispatch(deleteUserDislikedStartAsync(email, title, token, bool)),

  postUserHiddenStartAsync: (email, sourceName, token) =>
    dispatch(postUserHiddenStartAsync(email, sourceName, token)),
  deleteUserHiddenStartAsync: (email, sourceName, token) =>
    dispatch(deleteUserHiddenStartAsync(email, sourceName, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
