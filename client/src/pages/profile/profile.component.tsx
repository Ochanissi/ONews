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
          title='Saved Stories'
          text='You can save stories on ONews to read later. Saving for later is a great way to make sure you remember them.'
          icon='newspaper-outline'
          btn='Read all your saved stories'
          link='saved'
        />
        <ProfileItem
          title='Liked Stories'
          text='You can find here all the stories that you liked in the past.'
          icon='thumbs-up-sharp'
          btn='Read all your liked stories'
          link='liked'
        />
        <ProfileItem
          title='Disliked Stories'
          text='You can find here all the stories that you disliked in the past.'
          icon='thumbs-down-sharp'
          btn='Read all your disliked stories'
          link='disliked'
        />
      </section>
    </div>
  </div>
);

export default Profile;
