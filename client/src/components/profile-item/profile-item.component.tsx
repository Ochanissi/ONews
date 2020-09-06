import React from 'react';

import { Link } from 'react-router-dom';

import './profile-item.styles.scss';

const ProfileItem = () => (
  <article className='profile-item'>
    <div className='profile-item__content'>
      <div className='profile-item__content--text'>
        <h3>Privacy & personalization</h3>
        <p>
          See the data in your Google Account and choose what activity is saved
          to personalize your Google experience
        </p>
      </div>
      <div className='profile-item__content--image'>
        <ion-icon name='newspaper-outline'></ion-icon>
      </div>
    </div>

    <hr></hr>

    <div className='profile-item__btn'>
      <Link to='/'>Manage your data & personalization</Link>
    </div>
  </article>
);

export default ProfileItem;
