import React from "react";

import Toast from "light-toast";

import { FacebookShareButton, TwitterShareButton } from "react-share";

import "./article-share.styles.scss";

interface ArticleShareProps {
  title: string;
  source: string;
  url: string;
}

class ArticleShare extends React.Component<ArticleShareProps> {
  // Copies the article url to clipboard
  handleCopy = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const { url } = this.props;

    navigator.clipboard.writeText(url);

    Toast.success("Link copied to clipboard!", 1000);
  };

  render(): JSX.Element {
    const { title, source, url } = this.props;

    return (
      <div className="article-share">
        <div className="article-share__content">
          <div className="article-share__content--source">
            <h5>{source}</h5>
            <div className="article-share__close">
              <ion-icon name="close"></ion-icon>
            </div>
          </div>
          <h4 className="article-share__content--title">{title}</h4>
          <hr />
          <div className="article-share__content--share">
            <div className="article-share__content--share--title">
              Share this via
            </div>
            <div className="article-share__content--share--links">
              <button
                className="article-share__content--share--links--block"
                onClick={this.handleCopy}
              >
                <ion-icon name="link"></ion-icon>
                <p>Copy link</p>
              </button>
              <FacebookShareButton
                className="article-share__content--share--links--block"
                url={url}
                quote={title}
              >
                <ion-icon name="logo-facebook"></ion-icon>
                <p>Facebook</p>
              </FacebookShareButton>
              <TwitterShareButton
                className="article-share__content--share--links--block"
                url={url}
                title={title}
                via={source}
              >
                <ion-icon name="logo-twitter"></ion-icon>
                <p>Twitter</p>
              </TwitterShareButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleShare;
