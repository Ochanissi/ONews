import React from 'react';

import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import './sidebar-item.styles.scss';

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

const SidebarItem = ({
  userCountry,
  userCategory,
  linkType,
  linkCountry,
  iconType,
  itemLabel,
  countryBool,
  profileLink,
  location,
}: SidebarItemProps) => {
  return (
    <Link
      to={profileLink ? `${profileLink}` : `/news/${linkCountry}/${linkType}`}
    >
      <li
        className={
          countryBool && userCountry === linkCountry && !profileLink
            ? 'sidebar__selected--country'
            : !countryBool && userCategory === linkType && !profileLink
            ? 'sidebar__selected'
            : location.pathname === profileLink
            ? 'sidebar__selected'
            : ''
        }
      >
        <ion-icon name={iconType}></ion-icon>
        <p>{itemLabel}</p>
      </li>
    </Link>
  );
};

export default withRouter(SidebarItem);
