import React from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component<any> {
  // Ensures that page loads at the top when routing
  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
