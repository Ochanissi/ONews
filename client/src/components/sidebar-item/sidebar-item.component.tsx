import React from 'react';

import { Link } from 'react-router-dom';

import './sidebar-item.styles.scss';

interface SidebarItemProps {
  userCategory: string;
  userCountry: string;
  linkType: string;
  linkCountry: string;
  iconType: string;
  itemLabel: string;
  countryBool?: boolean;
}

const SidebarItem = ({
  userCountry,
  userCategory,
  linkType,
  linkCountry,
  iconType,
  itemLabel,
  countryBool,
}: SidebarItemProps) => {
  return (
    <Link to={`/news/${linkCountry}/${linkType}`}>
      <li
        className={
          countryBool && userCountry === linkCountry
            ? 'sidebar__selected--country'
            : !countryBool && userCategory === linkType
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

export default SidebarItem;
