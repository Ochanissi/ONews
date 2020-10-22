import React from 'react';

import './back-to-top.styles.scss';

interface BackToTopState {
  showBtn: boolean;
}

class BackToTop extends React.Component<{}, BackToTopState> {
  state = {
    showBtn: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.showHideScrollBtn);
    window.addEventListener('load', this.showHideScrollBtn);
  }

  componentWillUnmount() {
    // remove the showHideScrollBtn method
    window.removeEventListener('scroll', this.showHideScrollBtn);
  }

  showHideScrollBtn = () => {
    let currentScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    this.setState({ showBtn: currentScrollTop > 300 });
    // this.setState({ showBtn: true });
  };

  handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  render() {
    const { showBtn } = this.state;

    return (
      <button
        className={`back-to-top ${showBtn ? 'back-to-top__visible' : ''}`}
        onClick={this.handleScroll}
      >
        <ion-icon name='chevron-up-circle'></ion-icon>
      </button>
    );
  }
}

export default BackToTop;
