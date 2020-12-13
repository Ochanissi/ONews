import React from "react";
import { connect } from "react-redux";

import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../redux/store";
import { setUserSidebarMenu } from "../../redux/user/user.actions";

import "./sidebar-item.styles.scss";

interface SidebarItemProps extends RouteComponentProps {
  userCategory?: string;
  userCountry?: string;
  linkType?: string;
  linkCountry?: string;
  iconType: string;
  itemLabel: string;
  countryBool?: boolean;
  profileLink?: string;
}

type Props = SidebarItemProps & LinkDispatchProps;

class SidebarItem extends React.Component<Props> {
  handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    // event.preventDefault();

    const { setUserSidebarMenu } = this.props;

    if (window.innerWidth <= 1000) {
      setUserSidebarMenu(false);
    }
  };

  render(): JSX.Element {
    const {
      userCountry,
      userCategory,
      linkType,
      linkCountry,
      iconType,
      itemLabel,
      countryBool,
      profileLink,
      location,
    } = this.props;

    return (
      <Link
        to={profileLink ? `${profileLink}` : `/news/${linkCountry}/${linkType}`}
        onClick={this.handleClick}
      >
        <li
          className={
            countryBool && userCountry === linkCountry && !profileLink
              ? "sidebar__selected--country"
              : !countryBool && userCategory === linkType && !profileLink
              ? "sidebar__selected"
              : location.pathname === profileLink
              ? "sidebar__selected"
              : ""
          }
        >
          <ion-icon name={iconType}></ion-icon>
          <p>{itemLabel}</p>
        </li>
      </Link>
    );
  }
}

interface LinkDispatchProps {
  setUserSidebarMenu: (bool: boolean) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  setUserSidebarMenu: (bool) => dispatch(setUserSidebarMenu(bool)),
});

export default withRouter(connect(null, mapDispatchToProps)(SidebarItem));
