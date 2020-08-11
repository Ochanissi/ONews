import React from 'react';

import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import mainLogo from '../../assets/logo.png';

import './sidebar.styles.scss';
import { selectUserCategory } from '../../redux/user/user.selectors';

interface SidebarProps {
  history: any;
}

type Props = SidebarProps & LinkStateProps;

export const Sidebar = ({ userCategory }: Props) => {
  // console.log(userCategory);

  // const handleClick = (category: string) => (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ): void => {
  //   e.preventDefault();

  //   props.history.push(`/news/ro/${category}`);
  // };

  // console.log(userCategory);

  return (
    <nav role='navigation' className='sidebar'>
      <div id='menuToggle'>
        {/* A fake / hidden checkbox is used as click reciever, so you can use the :checked selector on it. */}
        <input type='checkbox' defaultChecked />

        <Link to='/'>
          {/* <span className='navbar__menu'>
            <ion-icon name='menu-sharp'></ion-icon>
          </span> */}
          <img src={mainLogo} alt='App Logo' className='navbar__logo' />
        </Link>

        {/* Some spans to act as a hamburger. They are acting like a real hamburger, not that McDonalds stuff. */}
        <span></span>
        <span></span>
        <span></span>

        {/* Too bad the menu has to be inside of the button but hey, it's pure CSS magic. */}
        <ul id='menu'>
          <Link to='/news/ro/general'>
            <li
              className={userCategory === 'general' ? 'sidebar__selected' : ''}
            >
              <ion-icon name='globe-outline'></ion-icon>
              <p>Top stories</p>
            </li>
          </Link>
          <a href='# '>
            <li>
              <ion-icon name='walk-sharp'></ion-icon>
              <p>For you</p>
            </li>
          </a>
          <a href='# '>
            <li>
              <ion-icon name='star-outline'></ion-icon>
              <p>Following</p>
            </li>
          </a>
          <a href='# '>
            <li>
              <ion-icon name='search'></ion-icon>
              <p>Saved searches</p>
            </li>
          </a>
          <hr></hr>
          <a href='# '>
            <li>
              <ion-icon name='flag'></ion-icon>
              <p>Romania</p>
            </li>
          </a>
          <a href='# '>
            <li>
              <ion-icon name='earth'></ion-icon>
              <p>World</p>
            </li>
          </a>
          <hr></hr>
          <Link to='/news/ro/business'>
            <li
              className={userCategory === 'business' ? 'sidebar__selected' : ''}
            >
              <ion-icon name='business-outline'></ion-icon>
              <p>Business</p>
            </li>
          </Link>
          <Link to='/news/ro/technology'>
            <li
              className={
                userCategory === 'technology' ? 'sidebar__selected' : ''
              }
            >
              <ion-icon name='rocket-outline'></ion-icon>
              <p>Technology</p>
            </li>
          </Link>
          <Link to='/news/ro/entertainment'>
            <li
              className={
                userCategory === 'entertainment' ? 'sidebar__selected' : ''
              }
            >
              <ion-icon name='game-controller-outline'></ion-icon>
              <p>Entertainment</p>
            </li>
          </Link>
          <Link to='/news/ro/science'>
            <li
              className={userCategory === 'science' ? 'sidebar__selected' : ''}
            >
              <ion-icon name='flask-sharp'></ion-icon>
              <p>Science</p>
            </li>
          </Link>
          <Link to='/news/ro/sports'>
            <li
              className={userCategory === 'sports' ? 'sidebar__selected' : ''}
            >
              <ion-icon name='bicycle'></ion-icon>
              <p>Sports</p>
            </li>
          </Link>
          <Link to='/news/ro/health'>
            <li
              className={userCategory === 'health' ? 'sidebar__selected' : ''}
            >
              <ion-icon name='barbell-sharp'></ion-icon>
              <p>Health</p>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

interface LinkStateProps {
  userCategory: string;
}

const mapStateToProps = createStructuredSelector({
  userCategory: selectUserCategory,
});

export default withRouter(connect(mapStateToProps)(Sidebar));
