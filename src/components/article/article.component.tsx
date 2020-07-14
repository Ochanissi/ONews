import React from 'react';

import './article.styles.scss';

const Article = () => {
  return (
    <article className='article'>
      <div className='article__content'>
        <h4 className='article__content--title'>
          Bucharest Police fine subway travelers not complying with Covid-19
          prevention measures
        </h4>
        <div className='article__content--source'>
          Romania Insider &middot; 12 hours ago
        </div>
        <p className='article__content--url'>View Full Coverage</p>
      </div>
      <img
        className='article__image'
        src='https://cacheimg.gsp.ro/autocrop/smp-images-production/gsp.ro/14072020/1594740828411.jpg?width=600&height=315'
        alt='Article'
      ></img>
    </article>
  );
};

export default Article;
