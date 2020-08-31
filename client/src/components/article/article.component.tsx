import React from 'react';

// import { connect } from 'react-redux';

// import { fetchNewsStartAsync, AppActions } from '../../redux/news/news.actions';

import defaultArticle from '../../assets/article-default.png';

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

// const Article: React.FC = ({
const Article: React.FunctionComponent<Props> = ({
  title,
  description,
  content,
  urlToImage,
  publishedAt,
  url,
  source: { name },
  id,
}) => {
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
    : '';

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
          <div className='article__content--source--options'>
            &nbsp; &middot; {dateFormat} hours ago &nbsp; &middot;
            <a
              className='article__content--source--options--save'
              href='# '
              target='_blank'
              rel='noopener noreferrer'
            >
              <ion-icon name='bookmark-outline'></ion-icon>
              <span className='article__content--source--options--save--info'>
                Save for later
              </span>
            </a>
            <a
              className='article__content--source--options--share'
              href='# '
              target='_blank'
              rel='noopener noreferrer'
            >
              <ion-icon name='share-social-outline'></ion-icon>
              <span className='article__content--source--options--share--info'>
                Share
              </span>
            </a>
            <a
              className='article__content--source--options--thumbs-up'
              href='# '
              target='_blank'
              rel='noopener noreferrer'
            >
              <ion-icon name='thumbs-up-sharp'></ion-icon>
              <span className='article__content--source--options--thumbs-up--info'>
                More stories like this
              </span>
            </a>
            <a
              className='article__content--source--options--thumbs-down'
              href='# '
              target='_blank'
              rel='noopener noreferrer'
            >
              <ion-icon name='thumbs-down-sharp'></ion-icon>
              <span className='article__content--source--options--thumbs-down--info'>
                Less stories like this
              </span>
            </a>
            <a
              className='article__content--source--options--hide'
              href='# '
              target='_blank'
              rel='noopener noreferrer'
            >
              <ion-icon name='eye-off'></ion-icon>
              <span className='article__content--source--options--hide--info'>
                Hide all stories from ...
              </span>
            </a>
          </div>
        </div>
        {description || description ? (
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
        ) : null}

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
          src={urlToImage || defaultArticle}
          alt='Article'
        ></img>
      </a>
    </article>
  );
};

// const mapStateToProps = (state) => ({});

export default Article;
