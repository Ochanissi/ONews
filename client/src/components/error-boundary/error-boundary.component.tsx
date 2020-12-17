import React, { ErrorInfo } from 'react';

import errorBoundaryBackground from '../../assets/error-boundary.png';

import './error-boundary.styles.scss';

interface ErrorBoundaryProps {}

interface ErrorBoundaryState {
  hasErrored: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasErrored: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className="error-boundary-overlay">
          <img
            className="error-image-container"
            src={errorBoundaryBackground}
            alt="Error Boundary Background"
          />
          <div className="error-image-text">This Page is a Ghost!</div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
