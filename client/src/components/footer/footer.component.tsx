import React from 'react';

import './footer.styles.scss';

const Footer = () => {
  return (
    <li className='footer'>
      <div className='footer__copyright'>
        Copyright &copy; 2020{' '}
        <div className='footer__copyright--name'>
          <a
            href='https://github.com/Ochanissi/'
            target='_blank'
            rel='noopener noreferrer'
            className='footer__copyright--link'
          >
            Mirel Bițoi
          </a>
        </div>
        . <div className='footer__copyright--rights'>All rights reserved.</div>
      </div>
    </li>
  );
};

export default Footer;
