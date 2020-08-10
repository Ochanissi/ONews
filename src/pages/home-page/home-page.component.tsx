import React from 'react';

import ArticlesContainer from '../../components/articles-container/articles-container.component';

import './home-page.styles.scss';

interface HomePageProps {
  match: {
    params: {
      category: string;
      country: string;
    };
  };
}

class HomePage extends React.Component<HomePageProps> {
  render() {
    const { category, country } = this.props.match.params;

    return (
      <div className='homepage'>
        <div className='homepage__content'>
          <ArticlesContainer newsCountry={country} newsCategory={category} />
        </div>
      </div>
    );
  }
}

export default HomePage;
