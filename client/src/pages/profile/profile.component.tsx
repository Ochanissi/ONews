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
          Manage your info, privacy, and security to make ONews work better for
          you.
        </p>
      </div>
      <section className='profile__content--container'>
        <ProfileItem
          title='Settings'
          text='See the data in your ONews Account and choose what activity is saved to personalize your ONews experience.'
          icon='settings-sharp'
          btn='Manage your data & personalization'
          link='settings'
        />
        <ProfileItem
          title='Saved stories'
          text='You can save stories on ONews to read later. Saving for later is a great way to make sure you remember them.'
          icon='newspaper-outline'
          btn='Read all your saved stories'
          link='saved-stories'
        />
        <ProfileItem
          title='Liked stories'
          text='You can find here all the stories that you liked in the past.'
          icon='thumbs-up-sharp'
          btn='Read all your liked stories'
          link='liked-stories'
        />
        <ProfileItem
          title='Disliked stories'
          text='You can find here all the stories that you disliked in the past.'
          icon='thumbs-down-sharp'
          btn='Read all your disliked stories'
          link='disliked-stories'
        />
        <ProfileItem
          title='Past searches'
          text='You can find here all your past news searches.'
          icon='search'
          btn='Check all your past searches'
          link='past-searches'
        />
        <ProfileItem
          title='Hidden sources'
          text='You can find here all the news sources that you hidden in the past.'
          icon='eye-off'
          btn='Check all your hidden sources'
          link='hidden-sources'
        />
      </section>
    </div>
  </div>
);

export default Profile;
