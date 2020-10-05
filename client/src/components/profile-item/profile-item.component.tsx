import React from 'react';

import { Link } from 'react-router-dom';

import './profile-item.styles.scss';

interface ProfileIemProps {
  title: string;
  text: string;
  icon: string;
  btn: string;
  link: string;
}

const ProfileItem: React.FunctionComponent<ProfileIemProps> = ({
  title,
  text,
  icon,
  btn,
  link,
}): JSX.Element => (
  <article className='profile-item'>
    <div className='profile-item__content'>
      <div className='profile-item__content--text'>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div
        className={`profile-item__content--image profile-item__content--image--${
          title === 'Saved stories'
            ? '3'
            : title === 'Liked stories'
            ? '2'
            : title === 'Disliked stories'
            ? '4'
            : title === 'Past searches'
            ? '5'
            : title === 'Hidden sources'
            ? '6'
            : ''
        }`}
      >
        <ion-icon name={icon}></ion-icon>
      </div>
    </div>

    <hr></hr>

    <Link className='profile-item__btn' to={`/profile/${link}`}>
      {btn}
    </Link>
  </article>
);

export default ProfileItem;
