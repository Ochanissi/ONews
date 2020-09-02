import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

import defaultLogo from '../../assets/default.png';

import './navbar.styles.scss';
import { User } from '../../redux/user/user.types';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import CustomButton from '../custom-button/custom-button.component';

interface NavbarProps extends RouteComponentProps {
  className: string;
}
interface NavbarState {
  searchValue: string;
}

type Props = NavbarProps & LinkStateProps;

class Navbar extends React.Component<Props, NavbarState> {
  constructor(props: Props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      searchValue: '',
    };
  }

  handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchValue: event.currentTarget.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // this.props.history.push(`/search/${this.state.searchValue}`);

    this.setState({ searchValue: '' });

    //   <Link
    //   to={`/search/${this.state.searchValue}`}
    //   className='navbar__main--btn-search'
    // ></Link>
  };

  handleSignOut = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const {
      signOutSuccess,
      currentUser: { name },
    } = this.props;

    signOutSuccess();
    // Toast.success(`See you soon, ${name}!`, 1500);
  };

  render(): JSX.Element {
    const { currentUser } = this.props;
    const { searchValue } = this.state;

    const { name, email } = currentUser;

    return (
      <nav role='navigation' className='navbar'>
        <input id='menu-toggle' type='checkbox' />
        <label className='menu-button-container' htmlFor='menu-toggle'>
          <div className='menu-button'></div>
        </label>

        <form onSubmit={this.handleSubmit} className='navbar__main'>
          <input
            id='searchBar'
            className='navbar__main--searchbar'
            type='text'
            placeholder='Search...'
            autoComplete='off'
            onChange={this.handleSearch}
            value={searchValue}
          />
          <button
            className='navbar__main--btn-search'
            type='submit'
            value='Submit'
          >
            <ion-icon name='search'></ion-icon>
          </button>
        </form>

        <ul className='navbar__secondary'>
          <li>
            <Link to='/'>
              <ion-icon name='home'></ion-icon>
            </Link>
          </li>
          <li>
            <Link to='/discover'>
              <ion-icon name='compass'></ion-icon>
            </Link>
          </li>
          <li>
            {/* <Link to='/profile'>
              
            </Link> */}

            <a href='#profile'>
              {currentUser ? (
                <img
                  src={defaultLogo}
                  alt='User Profile'
                  className='navbar__secondary--logo'
                />
              ) : (
                <ion-icon name='person-circle'></ion-icon>
              )}
            </a>
            <div id='profile' className='navbar__secondary--profile'>
              {/* <a href='#' className='navbar__secondary--profile--close-btn'>
                &times;
              </a> */}
              <div className='navbar__secondary--profile--content'>
                <img
                  src={defaultLogo}
                  alt='User Profile'
                  className='navbar__secondary--logo'
                />
                <h4>{name}</h4>
                <div>{email}</div>
                <Link to='/profile'>Manage your Google Account</Link>
                <hr></hr>
                <div className='navbar__secondary--profile--content--placeholder'>
                  Add another account
                </div>
                <hr></hr>
                <CustomButton profile onClick={this.handleSignOut}>
                  Sign Out
                </CustomButton>
                <hr></hr>
                <div className='navbar__secondary--profile--content--footer'>
                  <span>Privacy Policy | </span>
                  <span>Terms of Service</span>
                </div>
              </div>
            </div>
            <a
              href='#'
              className='navbar__secondary--profile--close-background'
            ></a>
          </li>
        </ul>
      </nav>
    );
  }
}

interface LinkStateProps {
  currentUser: User;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(Navbar));
