import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import ArticleSmall from "../../components/article-small/article-small.component";

import Article from "../../components/article/article.component";
import PageContainer from "../../components/page-container/page-container.component";
import { News } from "../../redux/news/news.types";
import {
  selectCurrentUser,
  selectUserDisliked,
  selectUserHidden,
  selectUserLiked,
  selectUserSaved,
  selectUserSearches,
} from "../../redux/user/user.selectors";
import { User } from "../../redux/user/user.types";

import "./profile-data.styles.scss";

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
  currentUser,
  userSaved,
  userLiked,
  userDisliked,
  userHidden,
  userSearches,
}): JSX.Element => {
  let newsArticles =
    type === "saved-stories"
      ? userSaved
      : type === "liked-stories"
      ? userLiked
      : type === "disliked-stories"
      ? userDisliked
      : [];

  let newsItems: [string] | [] =
    type === "past-searches"
      ? userSearches
      : type === "hidden-sources"
      ? userHidden
      : [];

  const subHeader =
    type === "saved-stories" ||
    type === "liked-stories" ||
    type === "disliked-stories"
      ? `You can find here all the stories that you ${
          type.toLowerCase().split("-")[0]
        } in the past.`
      : type === "past-searches"
      ? "You can find here all your past news searches."
      : type === "hidden-sources"
      ? "You can find here all the news sources that you hidden in the past."
      : "";

  const { joined } = currentUser;

  // console.log(type);
  // console.log(newsArticles);
  // console.log(userHidden);
  // console.log(newsItems);

  return (
    <PageContainer className="profile-data">
      <h2 className="profile-data__header">{`${
        type.slice(0, 1).toUpperCase() +
        type.slice(1).toLowerCase().replace("-", " ")
      }`}</h2>
      <h4 className="profile-data__sub-header">{subHeader}</h4>

      {newsArticles.length ? (
        <div className="profile-data__articles">
          {newsArticles.map((x: News, i: number) => (
            <Article key={`${i + type}`} {...x} id={`${i + type}`} />
          ))}
        </div>
      ) : null}

      {newsItems.length ? (
        <div className="profile-data__articles">
          {newsItems.map((x: string, i: number) => (
            <ArticleSmall
              key={`${i + type}`}
              name={x}
              type={type}
              id={`${i + type}`}
            />
          ))}
        </div>
      ) : null}

      {type === "about" ? (
        <div className="article-small profile-data__about">
          <span className="profile-data__about--1">Joined ONews on</span>
          <span className="profile-data__about--2">
            {joined.split("T")[0].split("-").reverse().join("/")}
          </span>
          <span className="profile-data__about--3">!</span>
        </div>
      ) : null}

      {!newsArticles.length && !newsItems.length && type !== "about" ? (
        <div className="profile-data__placeholder">{`You have no ${type
          .toLowerCase()
          .replace("-", " ")}!`}</div>
      ) : null}
    </PageContainer>
  );
};

interface LinkStateProps {
  currentUser: User;

  userSaved: News[];
  userLiked: News[];
  userDisliked: News[];
  userHidden: [string];
  userSearches: [string];
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,

  userSaved: selectUserSaved,
  userLiked: selectUserLiked,
  userDisliked: selectUserDisliked,
  userHidden: selectUserHidden,
  userSearches: selectUserSearches,
});

export default withRouter(connect(mapStateToProps)(ProfileData));
