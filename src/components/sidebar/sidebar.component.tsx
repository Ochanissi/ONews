import React from 'react';

import { Link } from 'react-router-dom';

import mainLogo from '../../assets/logo.png';

import './sidebar.styles.scss';

export const Sidebar = () => {
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
          <a href='# '>
            <li className='sidebar__selected'>
              <ion-icon name='globe-outline'></ion-icon>
              <p>Top stories</p>
            </li>
          </a>
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
          <a href='# '>
            <li>
              <ion-icon name='business-outline'></ion-icon>
              <p>Business</p>
            </li>
          </a>
          <a href='# '>
            <li>
              <ion-icon name='rocket-outline'></ion-icon>
              <p>Technology</p>
            </li>
          </a>
          <a href='# '>
            <li>
              <ion-icon name='game-controller-outline'></ion-icon>
              <p>Entertainment</p>
            </li>
          </a>
          <a href='# '>
            <li>
              <ion-icon name='flask-sharp'></ion-icon>
              <p>Science</p>
            </li>
          </a>
          <a href='# '>
            <li>
              <ion-icon name='bicycle'></ion-icon>
              <p>Sports</p>
            </li>
          </a>
          <a href='# '>
            <li>
              <ion-icon name='barbell-sharp'></ion-icon>
              <p>Health</p>
            </li>
          </a>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
