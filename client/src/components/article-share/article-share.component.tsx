import React from "react";

import "./article-share.styles.scss";

const ArticleShare = () => {
  return (
    <div className="article-share">
      <div className="article-share__content">
        <div className="article-share__content--source">
          <h5>Yahoo News</h5>
          <ion-icon name="close"></ion-icon>
        </div>
        <h4 className="article-share__content--title">
          Democrats keep winning the popular vote. That worries them.
        </h4>
        <hr />
        <div className="article-share__content--share">
          <div className="article-share__content--share--title"></div>
          <div className="article-share__content--share--links">
            <div>Copy Link</div>
            <div>Facebook</div>
            <div>Twitter</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleShare;
