import React from 'react';

// import { connect } from 'react-redux';

// import { fetchNewsStartAsync, AppActions } from '../../redux/news/news.actions';

import { News } from '../../redux/news/news.types';

import './article.styles.scss';
// import { ThunkDispatch } from 'redux-thunk';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': { name: string };
    }
  }
}

interface ArticleProps {
  id: number;
}

type Props = ArticleProps & News;

const Article = ({
  title,
  description,
  content,
  urlToImage,
  publishedAt,
  url,
  source: { name },
  id,
}: Props) => {
  // console.log(data);
  // console.log(id);

  // { title, description, urlToImage }: News
  // props: News, id: number

  // const { title, description, urlToImage } = props;

  const dateFormat = Math.round(
    (Date.now() - Date.parse(publishedAt)) / 3600000
  );

  const contentFiltered = content
    ? content.replace(/↵|<ul>|<li>|<\/li>|<\/ul>/g, '')
    : content;

  return (
    <article className='article'>
      <div className='article__content'>
        <a
          className='article__content--title'
          href={url}
          target='_blank'
          rel='noopener noreferrer'
        >
          <h3 className='article__content--title--text'>{title}</h3>
        </a>

        <div className='article__content--source'>
          <a
            className='article__content--source--url'
            href={url}
            target='_blank'
            rel='noopener noreferrer'
          >
            {name}
          </a>
          <div className='article__content--source--date'>
            &nbsp; &middot; {dateFormat} hours ago &nbsp; &middot; &nbsp;
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
            id={`article-dropdown-${id}`}
          />
          <p className='article__content--description--content'>
            {description ? description : contentFiltered.split('[+')[0]}
          </p>

          <label
            htmlFor={`article-dropdown-${id}`}
            className='article__content--description--toggle'
          >
            <ion-icon name='chevron-down-outline'></ion-icon>
          </label>
        </div>

        <a
          className='article__content--coverage'
          href={url}
          target='_blank'
          rel='noopener noreferrer'
        >
          <ion-icon name='newspaper-outline'></ion-icon>
          View Full Coverage
        </a>
      </div>
      <a
        className='article__image-container'
        href={url}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          className='article__image-container--image'
          src={urlToImage}
          alt='Article'
        ></img>
      </a>
    </article>
  );
};

// const mapStateToProps = (state) => ({});

export default Article;
