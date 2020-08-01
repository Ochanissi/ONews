import React from 'react';

// import { connect } from 'react-redux';

// import { fetchNewsStartAsync, AppActions } from '../../redux/news/news.actions';

import './article.styles.scss';
import { ThunkDispatch } from 'redux-thunk';

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
              <span className='article__content--source--date--save--info'>
                Save for later
              </span>
            </a>
            <a
              className='article__content--source--date--share'
              href='# '
              target='_blank'
              rel='noopener noreferrer'
            >
              <ion-icon name='share-social-outline'></ion-icon>
              <span className='article__content--source--date--share--info'>
                Share
              </span>
            </a>
          </div>
        </div>
        <div className='article__content--description'>
          <input
            type='checkbox'
            className='article__content--description--state'
            id='article-dropdown'
          />
          <p className='article__content--description--content'>
            Nasopharyngeal swabs more effective than saliva samples for COVID-19
            diagnostic testing according to current evidence. Nasopharyngeal
            swabs more effective than saliva samples for COVID-19 diagnostic
            testing according to current evidence.
          </p>

          <label
            htmlFor='article-dropdown'
            className='article__content--description--toggle'
          >
            <ion-icon name='chevron-down-outline'></ion-icon>
          </label>
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
    </article>
  );
};

// const mapStateToProps = (state) => ({});

export default Article;
