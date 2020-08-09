import React from 'react';

import ArticlesContainer from '../../components/articles-container/articles-container.component';

import './home-page.styles.scss';

interface HomePageProps {
  location: {
    pathname: string;
    search: string;
  };
}

class HomePage extends React.Component<HomePageProps> {
  render() {
    const { pathname, search } = this.props.location;

    // console.log(pathname, search);
    // console.log(this.props);

    const newsCountry = search.slice(1).split('&')[0].split('=')[1];
    const newsCategory = search.slice(1).split('&')[1].split('=')[1];

    console.log(newsCountry, newsCategory);

    return (
      <div className='homepage'>
        <div className='homepage__content'>
          <ArticlesContainer
            newsCountry={newsCountry}
            newsCategory={newsCategory}
          />
        </div>
      </div>
    );
  }
}

export default HomePage;
