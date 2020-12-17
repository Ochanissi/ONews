import React from 'react';

import Spinner from '../spinner/spinner.component';

interface WithSpinnerProps {
  isLoading: boolean;
}

const WithSpinner = (WrappedComponent: any) => ({
  isLoading,
  ...otherProps
}: WithSpinnerProps): JSX.Element => {
  return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
