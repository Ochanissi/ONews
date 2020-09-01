import React from 'react';

import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import mainLogo from '../../assets/logo.png';

import './sidebar.styles.scss';
import {
  selectUserCategory,
  selectUserCountry,
} from '../../redux/user/user.selectors';

import SidebarItem from './../sidebar-item/sidebar-item.component';

interface SidebarProps extends RouteComponentProps {}

type Props = SidebarProps & LinkStateProps;

export const Sidebar = ({ userCategory, userCountry }: Props) => {
  return (
    <nav role='navigation' className='sidebar'>
      <div id='menuToggle'>
        <input type='checkbox' defaultChecked />

        <Link to='/'>
          <img src={mainLogo} alt='App Logo' className='navbar__logo' />
        </Link>

        <span></span>
        <span></span>
        <span></span>

        <ul id='menu'>
          <SidebarItem
            userCountry={userCountry}
            userCategory={userCategory}
            linkType='general'
            linkCountry={userCountry}
            iconType='globe-outline'
            itemLabel='Top stories'
          />

          <SidebarItem
            userCountry={userCountry}
            userCategory={userCategory}
            linkType=''
            linkCountry={userCountry}
            iconType='walk-sharp'
            itemLabel='For you'
          />

          <SidebarItem
            userCountry={userCountry}
            userCategory={userCategory}
            linkType=''
            linkCountry={userCountry}
            iconType='star-outline'
            itemLabel='Following'
          />

          <SidebarItem
            userCountry={userCountry}
            userCategory={userCategory}
            linkType=''
            linkCountry={userCountry}
            iconType='search'
            itemLabel='Saved searches'
          />

          <hr></hr>

          <SidebarItem
            userCountry={userCountry}
            userCategory={userCategory}
            linkType={userCategory}
            linkCountry='ro'
            iconType='flag'
            itemLabel='Romania'
            countryBool
          />

          <SidebarItem
            userCountry={userCountry}
            userCategory={userCategory}
            linkType={userCategory}
            linkCountry='us'
            iconType='earth'
            itemLabel='World'
            countryBool
          />

          <hr></hr>

          <SidebarItem
            userCountry={userCountry}
            userCategory={userCategory}
            linkType='business'
            linkCountry={userCountry}
            iconType='business-outline'
            itemLabel='Business'
          />

          <SidebarItem
            userCountry={userCountry}
            userCategory={userCategory}
            linkType='technology'
            linkCountry={userCountry}
            iconType='rocket-outline'
            itemLabel='Technology'
          />

          <SidebarItem
            userCountry={userCountry}
            userCategory={userCategory}
            linkType='entertainment'
            linkCountry={userCountry}
            iconType='game-controller-outline'
            itemLabel='Entertainment'
          />

          <SidebarItem
            userCountry={userCountry}
            userCategory={userCategory}
            linkType='science'
            linkCountry={userCountry}
            iconType='flask-sharp'
            itemLabel='Science'
          />

          <SidebarItem
            userCountry={userCountry}
            userCategory={userCategory}
            linkType='sports'
            linkCountry={userCountry}
            iconType='bicycle'
            itemLabel='Sports'
          />

          <SidebarItem
            userCountry={userCountry}
            userCategory={userCategory}
            linkType='health'
            linkCountry={userCountry}
            iconType='barbell-sharp'
            itemLabel='Health'
          />
        </ul>
      </div>
    </nav>
  );
};

interface LinkStateProps {
  userCategory: string;
  userCountry: string;
}

const mapStateToProps = createStructuredSelector({
  userCategory: selectUserCategory,
  userCountry: selectUserCountry,
});

export default withRouter(connect(mapStateToProps)(Sidebar));
