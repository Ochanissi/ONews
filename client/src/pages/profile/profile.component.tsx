import React from 'react';

import defaultLogo from '../../assets/default.png';

import ProfileItem from '../../components/profile-item/profile-item.component';

import './profile.styles.scss';

const Profile = () => (
  <div className='profile'>
    <div className='profile__content'>
      <div className='profile__content--header'>
        <img
          src={defaultLogo}
          alt='User Profile'
          className='profile__content--header--avatar'
        />
        <h2 className='profile__content--header--1'>Welcome, Mirel Bițoi!</h2>
        <p className='profile__content--header--2'>
          Manage your info, privacy, and security to make Google work better for
          you.
        </p>
      </div>
      <section className='profile__content--container'>
        <ProfileItem />
        <ProfileItem />
        <ProfileItem />
        <ProfileItem />
      </section>
    </div>
  </div>
);

export default Profile;
