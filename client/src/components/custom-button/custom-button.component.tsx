import React from 'react';
import { Link } from 'react-router-dom';

import './custom-button.styles.scss';

interface CustomButtonProps {
  children: JSX.Element | string;
  link?: string;
  type?: any;
  profile?: boolean;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
}

const CustomButton: React.FunctionComponent<CustomButtonProps> = ({
  children,
  link,
  profile,
  ...otherProps
}): JSX.Element => {
  return link ? (
    <Link
      to={link}
      className={`custom-button custom-button__inverted ${
        profile ? 'custom-button__profile' : null
      }`}
      {...otherProps}
    >
      {children}
    </Link>
  ) : (
    <button
      className={`custom-button ${profile ? 'custom-button__profile' : null}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
