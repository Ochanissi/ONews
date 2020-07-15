import React from 'react';

import './article.styles.scss';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': { name: string };
    }
  }
}

const Article = () => {
  return (
    <article className='article'>
      <div className='article__content'>
        <a
          className='article__content--title'
          href='# '
          target='_blank'
          rel='noopener noreferrer'
        >
          <h3 className='article__content--title--text'>
            Bucharest Police fine subway travelers not complying with Covid-19
            prevention measures
          </h3>
        </a>

        <div className='article__content--source'>
          <a
            className='article__content--source--url'
            href='# '
            target='_blank'
            rel='noopener noreferrer'
          >
            Romania Insider
          </a>
          <div className='article__content--source--date'>
            &nbsp; &middot; 12 hours ago &nbsp; &middot; &nbsp;
            <a
              className='article__content--source--date--save'
              href='# '
              target='_blank'
              rel='noopener noreferrer'
            >
              <ion-icon name='bookmark-outline'></ion-icon>
            </a>
            <a
              className='article__content--source--date--share'
              href='# '
              target='_blank'
              rel='noopener noreferrer'
            >
              <ion-icon name='share-social-outline'></ion-icon>
            </a>
          </div>
        </div>
        <a
          className='article__content--coverage'
          href='# '
          target='_blank'
          rel='noopener noreferrer'
        >
          <ion-icon name='newspaper-outline'></ion-icon>
          View Full Coverage
        </a>
      </div>
      <div className='article__additional'>
        <a
          className='article__image-container'
          href='# '
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className='article__image-container--image'
            src='https://cacheimg.gsp.ro/autocrop/smp-images-production/gsp.ro/14072020/1594740828411.jpg?width=600&height=315'
            alt='Article'
          ></img>
        </a>

        <a
          className='article__additional--description'
          href='# '
          target='_blank'
          rel='noopener noreferrer'
        >
          <ion-icon name='chevron-down-outline'></ion-icon>
        </a>
      </div>
    </article>
  );
};

export default Article;
