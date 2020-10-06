import React from 'react';

import './article-small.styles.scss';

interface ArticleSmallProps {
  name: string;
  id: string;
}

const ArticleSmall: React.FunctionComponent<ArticleSmallProps> = ({ name }) => {
  // console.log(name);

  return (
    <div className='article-small'>
      <div className='article-small__name'>{name}</div>
      <div className='article-small__btn'>button</div>
    </div>
  );
};

export default ArticleSmall;
