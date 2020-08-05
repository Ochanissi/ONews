import React from 'react';

import ArticlesContainer from '../../components/articles-container/articles-container.component';

import './home-page.styles.scss';

class HomePage extends React.Component {
  render() {
    return (
      <div className='homepage'>
        <div className='homepage__content'>
          <ArticlesContainer />
        </div>
      </div>
    );
  }
}

export default HomePage;
