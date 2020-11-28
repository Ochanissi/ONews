import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import defaultLogo from "../../assets/default.png";
import PageContainer from "../../components/page-container/page-container.component";

import ProfileItem from "../../components/profile-item/profile-item.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { User } from "../../redux/user/user.types";

import "./profile.styles.scss";

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config({ path: '../../.env' });
// }

const Profile: React.FunctionComponent<LinkStateProps> = ({
  currentUser: { name, photo },
}): JSX.Element => {
  return (
    <PageContainer className="profile">
      <div className="profile__header">
        <img
          src={`${process.env.REACT_APP_ONEWS_BACKEND_URL}img/users/${photo}`}
          alt="User Profile"
          className="profile__header--avatar"
        />
        <h2 className="profile__header--1">Welcome, {name}!</h2>
        <p className="profile__header--2">
          Manage your info, privacy, and security to make ONews work better for
          you.
        </p>
      </div>
      <section className="profile__container">
        <ProfileItem
          title="Settings"
          text="See the data in your ONews Account and choose what activity is saved to personalize your ONews experience."
          icon="settings-sharp"
          btn="Manage your data & personalization"
          link="settings"
        />
        <ProfileItem
          title="Saved stories"
          text="You can save stories on ONews to read later. Saving for later is a great way to make sure you remember them."
          icon="newspaper-outline"
          btn="Read all your saved stories"
          link="saved-stories"
        />
        <ProfileItem
          title="Liked stories"
          text="You can find here all the stories that you liked in the past."
          icon="thumbs-up-sharp"
          btn="Read all your liked stories"
          link="liked-stories"
        />
        <ProfileItem
          title="Disliked stories"
          text="You can find here all the stories that you disliked in the past."
          icon="thumbs-down-sharp"
          btn="Read all your disliked stories"
          link="disliked-stories"
        />
        <ProfileItem
          title="Past searches"
          text="You can find here all your past news searches."
          icon="search"
          btn="Check all your past searches"
          link="past-searches"
        />
        <ProfileItem
          title="Hidden sources"
          text="You can find here all the news sources that you hidden in the past."
          icon="eye-off"
          btn="Check all your hidden sources"
          link="hidden-sources"
        />
      </section>
    </PageContainer>
  );
};

interface LinkStateProps {
  currentUser: User;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Profile);
