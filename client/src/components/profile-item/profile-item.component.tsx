import React from 'react';

import { Link } from 'react-router-dom';

import './profile-item.styles.scss';

interface ProfileIemProps {
  title: string;
  text: string;
  icon: string;
  btn: string;
}

const ProfileItem: React.FunctionComponent<ProfileIemProps> = ({
  title,
  text,
  icon,
  btn,
}): JSX.Element => (
  <article className='profile-item'>
    <div className='profile-item__content'>
      <div className='profile-item__content--text'>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div
        className={`profile-item__content--image profile-item__content--image--${
          title === 'Saved Stories'
            ? '3'
            : title === 'Liked Stories'
            ? '2'
            : title === 'Disliked Stories'
            ? '4'
            : ''
        }`}
      >
        <ion-icon name={icon}></ion-icon>
      </div>
    </div>

    <hr></hr>

    <div className='profile-item__btn'>
      <Link to='/'>{btn}</Link>
    </div>
  </article>
);

export default ProfileItem;
