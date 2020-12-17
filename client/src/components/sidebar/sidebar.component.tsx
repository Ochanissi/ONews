import React from 'react';

import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import mainLogo from '../../assets/logo.png';

import './sidebar.styles.scss';
import {
  selectUserCategory,
  selectUserCountry,
  selectUserSidebarMenu,
} from '../../redux/user/user.selectors';

import SidebarItem from './../sidebar-item/sidebar-item.component';
import Footer from '../footer/footer.component';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../redux/store';
import { setUserSidebarMenu } from '../../redux/user/user.actions';

interface SidebarProps extends RouteComponentProps {}

interface SidebarState {}

type Props = SidebarProps & LinkStateProps & LinkDispatchProps;

class Sidebar extends React.Component<Props, SidebarState> {
  handleChecked = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const { userSidebarMenu, setUserSidebarMenu } = this.props;

    setUserSidebarMenu(!userSidebarMenu);
  };

  render() {
    const { userCategory, userCountry, location } = this.props;
    const { userSidebarMenu } = this.props;

    return (
      <nav role="navigation" className="sidebar">
        <div className="menu-sidebar">
          <button
            className={`sidebar-bool ${
              userSidebarMenu ? 'sidebar-bool--checked' : ''
            }`}
            onClick={this.handleChecked}
          >
            <ion-icon name="menu-sharp"></ion-icon>
          </button>

          <Link to={`/news/${userCountry}/${userCategory}`}>
            <img src={mainLogo} alt="App Logo" className="navbar__logo" />
          </Link>

          {location.pathname.startsWith('/profile') ? (
            <ul
              className={`menu-sidebar__menu ${
                userSidebarMenu ? 'menu-sidebar__menu--checked' : ''
              }`}
            >
              <SidebarItem
                iconType="person-circle-outline"
                itemLabel="Home"
                profileLink="/profile"
              />

              <SidebarItem
                iconType="settings-sharp"
                itemLabel="Settings"
                profileLink="/profile/settings"
              />

              <SidebarItem
                iconType="newspaper-outline"
                itemLabel="Saved stories"
                profileLink="/profile/saved-stories"
              />

              <SidebarItem
                iconType="thumbs-up-sharp"
                itemLabel="Liked stories"
                profileLink="/profile/liked-stories"
              />

              <SidebarItem
                iconType="thumbs-down-sharp"
                itemLabel="Disliked stories"
                profileLink="/profile/disliked-stories"
              />

              <SidebarItem
                iconType="search"
                itemLabel="Past searches"
                profileLink="/profile/past-searches"
              />

              <SidebarItem
                iconType="eye-off"
                itemLabel="Hidden sources"
                profileLink="/profile/hidden-sources"
              />

              <hr></hr>

              <SidebarItem
                iconType="information-circle-outline"
                itemLabel="About"
                profileLink="/profile/about"
              />

              <hr></hr>

              <Footer />
            </ul>
          ) : (
            <ul
              className={`menu-sidebar__menu ${
                userSidebarMenu ? 'menu-sidebar__menu--checked' : ''
              }`}
            >
              <SidebarItem
                userCountry={userCountry}
                userCategory={userCategory}
                linkType="general"
                linkCountry={userCountry}
                iconType="globe-outline"
                itemLabel="Top stories"
              />

              <SidebarItem
                iconType="newspaper-outline"
                itemLabel="Saved for later"
                profileLink="/profile/saved-stories"
              />

              <SidebarItem
                iconType="search"
                itemLabel="Past searches"
                profileLink="/profile/past-searches"
              />

              <hr></hr>

              <SidebarItem
                userCountry={userCountry}
                userCategory={userCategory}
                linkType={userCategory}
                linkCountry="ro"
                iconType="flag"
                itemLabel="Romania"
                countryBool
              />

              <SidebarItem
                userCountry={userCountry}
                userCategory={userCategory}
                linkType={userCategory}
                linkCountry="us"
                iconType="earth"
                itemLabel="World"
                countryBool
              />

              <hr></hr>

              <SidebarItem
                userCountry={userCountry}
                userCategory={userCategory}
                linkType="business"
                linkCountry={userCountry}
                iconType="business-outline"
                itemLabel="Business"
              />

              <SidebarItem
                userCountry={userCountry}
                userCategory={userCategory}
                linkType="technology"
                linkCountry={userCountry}
                iconType="rocket-outline"
                itemLabel="Technology"
              />

              <SidebarItem
                userCountry={userCountry}
                userCategory={userCategory}
                linkType="entertainment"
                linkCountry={userCountry}
                iconType="game-controller-outline"
                itemLabel="Entertainment"
              />

              <SidebarItem
                userCountry={userCountry}
                userCategory={userCategory}
                linkType="science"
                linkCountry={userCountry}
                iconType="flask-sharp"
                itemLabel="Science"
              />

              <SidebarItem
                userCountry={userCountry}
                userCategory={userCategory}
                linkType="sports"
                linkCountry={userCountry}
                iconType="bicycle"
                itemLabel="Sports"
              />

              <SidebarItem
                userCountry={userCountry}
                userCategory={userCategory}
                linkType="health"
                linkCountry={userCountry}
                iconType="barbell-sharp"
                itemLabel="Health"
              />

              <hr></hr>

              <Footer />
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

interface LinkStateProps {
  userCategory: string;
  userCountry: string;
  userSidebarMenu: boolean;
}

interface LinkDispatchProps {
  setUserSidebarMenu: (bool: boolean) => void;
}

const mapStateToProps = createStructuredSelector({
  userCategory: selectUserCategory,
  userCountry: selectUserCountry,
  userSidebarMenu: selectUserSidebarMenu,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  setUserSidebarMenu: (bool) => dispatch(setUserSidebarMenu(bool)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
);
