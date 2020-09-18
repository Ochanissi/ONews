import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

import defaultLogo from '../../assets/default.png';

import './navbar.styles.scss';
import { User } from '../../redux/user/user.types';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import CustomButton from '../custom-button/custom-button.component';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../redux/store';
import { signOut } from '../../redux/user/user.actions';

interface NavbarProps extends RouteComponentProps {}
interface NavbarState {
  searchValue: string;
  popupVisible: boolean;
}

type Props = NavbarProps & LinkStateProps & LinkDispatchProps;

class Navbar extends React.Component<Props, NavbarState> {
  constructor(props: Props) {
    super(props);

    // this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      searchValue: '',
      popupVisible: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick = (event: any): void => {
    // console.log(event.target.className);

    if (event.target.className === 'navbar__secondary--logo') {
      this.setState((prevState) => ({
        popupVisible: !prevState.popupVisible,
      }));
    } else if (
      event.target.className === 'navbar__secondary--profile' ||
      event.target.className === 'navbar__secondary--profile--x'
    ) {
      this.setState({ popupVisible: true });
    } else {
      this.setState({ popupVisible: false });
    }
  };

  // componentDidUpdate(prevProps: Props) {
  //   const { pathname } = this.props.location;

  //   if (pathname !== prevProps.location.pathname) {
  //     this.forceUpdate();
  //     console.log('lel');
  //   }
  // }

  handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchValue: event.currentTarget.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // this.props.history.push(`/search/${this.state.searchValue}`);

    this.setState({ searchValue: '' });
  };

  handleSignOut = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const {
      signOut,
      currentUser: { name },
    } = this.props;

    signOut();
    // Toast.success(`See you soon, ${name}!`, 1500);
  };

  render(): JSX.Element {
    const { currentUser } = this.props;
    const { searchValue, popupVisible } = this.state;

    // console.log(popupVisible);

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
            {currentUser ? (
              <div>
                <img
                  src={defaultLogo}
                  alt='User Profile'
                  className='navbar__secondary--logo'
                />
                {popupVisible ? (
                  <div className='navbar__secondary--profile'>
                    <Link
                      to='/profile'
                      className='navbar__secondary--profile--link-1'
                    >
                      <img
                        src={defaultLogo}
                        alt='User Profile'
                        className='navbar__secondary--logo'
                      />
                    </Link>

                    <h4 className='navbar__secondary--profile--x'>
                      {currentUser.name}
                    </h4>
                    <div className='navbar__secondary--profile--x'>
                      {currentUser.email}
                    </div>
                    <Link
                      to='/profile'
                      className='navbar__secondary--profile--link-2'
                    >
                      Manage your Onews Account
                    </Link>
                    <hr className='navbar__secondary--profile--x'></hr>
                    <div className='navbar__secondary--profile--placeholder'>
                      Add another account
                    </div>
                    <hr className='navbar__secondary--profile--x'></hr>
                    <CustomButton profile onClick={this.handleSignOut}>
                      Sign Out
                    </CustomButton>
                    <hr className='navbar__secondary--profile--x'></hr>
                    <div className='navbar__secondary--profile--footer'>
                      <span className='navbar__secondary--profile--x'>
                        Privacy Policy
                      </span>
                      <span className='navbar__secondary--profile--x'> | </span>
                      <span className='navbar__secondary--profile--x'>
                        Terms of Service
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link to='/auth/sign-in'>
                <ion-icon name='person-circle'></ion-icon>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

interface LinkStateProps {
  currentUser: User;
}

interface LinkDispatchProps {
  signOut: () => void;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  signOut: () => dispatch(signOut()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
