import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

import defaultLogo from '../../assets/default.png';

import './navbar.styles.scss';
import { User } from '../../redux/user/user.types';
import {
  selectCurrentUser,
  selectUserCountry,
} from '../../redux/user/user.selectors';
import CustomButton from '../custom-button/custom-button.component';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../redux/store';
import { signOut } from '../../redux/user/user.actions';

interface NavbarProps extends RouteComponentProps {}
interface NavbarState {
  searchValue: string;
  popupVisible: boolean;
  dropdownVisible: boolean;
  searchTitle: boolean;
  searchLocation: string;
  searchDate: string;
  searchSortBy: string;
}

type Props = NavbarProps & LinkStateProps & LinkDispatchProps;

class Navbar extends React.Component<Props, NavbarState> {
  constructor(props: Props) {
    super(props);

    // this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      popupVisible: false,
      dropdownVisible: false,

      searchValue: '',
      searchTitle: false,
      searchLocation: this.props.userCountry,
      searchDate: 'anytime',
      searchSortBy: 'publishedAt',
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
    // console.log(event.target.parentNode.className);

    // console.log(event.target.className);

    const defaultClick = event.target.className || '';
    const defaultClickParent = event.target.parentNode.className || '';

    if (defaultClick === 'navbar__secondary--logo') {
      this.setState((prevState) => ({
        popupVisible: !prevState.popupVisible,
      }));
    } else if (
      defaultClick === 'navbar__secondary--profile' ||
      defaultClick === 'navbar__secondary--profile--x'
    ) {
      this.setState({ popupVisible: true });
    } else {
      this.setState({ popupVisible: false });
    }

    if (defaultClickParent === 'navbar__main--dd-icon') {
      this.setState((prevState) => ({
        dropdownVisible: !prevState.dropdownVisible,
      }));
    } else if (
      defaultClick.startsWith('navbar__main--searchbar') ||
      defaultClick.startsWith('navbar__main--dropdown') ||
      defaultClickParent.startsWith('navbar__main--dropdown')
    ) {
      this.setState({ dropdownVisible: true });
    } else {
      this.setState({ dropdownVisible: false });
    }
  };

  // componentDidUpdate(prevProps: Props) {
  //   const { pathname } = this.props.location;

  //   if (pathname !== prevProps.location.pathname) {
  //     this.forceUpdate();
  //     console.log('lel');
  //   }
  // }

  handleSearch = (event: any): void => {
    if (event.currentTarget.id === 'title') {
      this.setState({
        searchTitle: !this.state.searchTitle,
      });
    } else if (event.currentTarget.id === 'location') {
      this.setState({
        searchLocation: event.currentTarget.value,
      });
    } else if (event.currentTarget.id === 'date') {
      let date: any;

      if (event.currentTarget.value === 'hour') {
        date = new Date(new Date().getTime() - 1000 * 60 * 60).toISOString();
      } else if (event.currentTarget.value === 'day') {
        date = new Date().toISOString().split('T')[0];
      } else if (event.currentTarget.value === 'week') {
        date = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];
      } else if (event.currentTarget.value === 'month') {
        date = date = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];
      } else if (event.currentTarget.value === 'anytime') {
        date = 'anytime';
      }

      // const date: any =
      //   event.currentTarget.value === 'hour'
      //     ? new Date(new Date().getTime() - 1000 * 60 * 60)
      //     : event.currentTarget.value === 'day'
      //     ? new Date()
      //     : event.currentTarget.value === 'week'
      //     ? new Date().setDate(new Date().getDate() - 7)
      //     : '';

      // console.log(date);
      // console.log(new Date().toISOString());

      this.setState({
        searchDate: date,
      });
    } else if (event.currentTarget.id === 'sort') {
      this.setState({
        searchSortBy: event.currentTarget.value,
      });
    } else if (event.currentTarget.id === 'searchBar') {
      this.setState({
        searchValue: event.currentTarget.value,
      });
    }

    // this.setState({
    //   searchValue: event.currentTarget.value,
    //   searchTitle: !this.state.searchTitle,
    // });

    // console.log(event.currentTarget.value);
    // console.log(event.currentTarget);
    // console.log(new Date().toISOString());
    // console.log(this.state.searchDate);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const {
      searchValue,
      searchDate,
      searchSortBy,
      searchTitle,
      searchLocation,
    } = this.state;

    // console.log(searchValue);

    // this.props.history.push(
    //   `/search/
    // ${searchValue.replace(
    //   / /g,
    //   '%20'
    // )}/${searchTitle}/${searchDate}/${searchLocation}/${searchSortBy}`.replace(
    //     / /g,
    //     ''
    //   )
    // );

    this.props.history.push(
      `/search/${`${searchValue}/${searchTitle}/${searchDate}/${searchLocation}/${searchSortBy}`.trim()}`
    );

    // console.log(this.state);
    this.setState({
      searchValue: '',
      searchTitle: false,
      searchLocation: this.props.userCountry,
      searchDate: 'anytime',
      searchSortBy: 'publishedAt',
      dropdownVisible: false,
    });
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

  handleClear = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    this.setState({
      searchValue: '',
      searchTitle: false,
      searchLocation: this.props.userCountry,
      searchDate: 'anytime',
      searchSortBy: 'publishedAt',
    });
  };

  render(): JSX.Element {
    const { currentUser } = this.props;
    const {
      searchValue,
      popupVisible,
      dropdownVisible,
      searchTitle,
      searchLocation,
    } = this.state;

    // console.log(popupVisible);
    // console.log(dropdownVisible);

    // console.log(searchTitle);

    // console.log(this.props);

    return (
      <nav role='navigation' className='navbar'>
        <input id='menu-toggle' type='checkbox' />
        <label className='menu-button-container' htmlFor='menu-toggle'>
          <div className='menu-button'></div>
        </label>

        <div className='navbar__main'>
          <div
            className={`navbar__main--container ${
              dropdownVisible ? 'navbar__main--container--focused' : ''
            }`}
          >
            <form onSubmit={this.handleSubmit}>
              <button
                className='navbar__main--btn-search'
                type='submit'
                value='Submit'
              >
                <ion-icon name='search'></ion-icon>
              </button>

              <input
                id='searchBar'
                className='navbar__main--searchbar'
                type='text'
                placeholder='Search...'
                autoComplete='off'
                onChange={this.handleSearch}
                value={searchValue}
              />
              <div className='navbar__main--dd-icon'>
                <ion-icon
                  name={`caret-${dropdownVisible ? 'up' : 'down'}-sharp`}
                ></ion-icon>
              </div>
            </form>

            {dropdownVisible ? (
              <form
                className='navbar__main--dropdown'
                onSubmit={this.handleSubmit}
              >
                <div className='navbar__main--dropdown--header'>
                  Narrow your search results
                </div>

                <div className='navbar__main--dropdown--row'>
                  <label htmlFor='title'>Title search</label>
                  <input
                    type='checkbox'
                    id='title'
                    name='title'
                    value='title'
                    onChange={this.handleSearch}
                    checked={searchTitle}
                  />
                </div>

                <div className='navbar__main--dropdown--row'>
                  <label htmlFor='location'>Location</label>
                  <select
                    name='location'
                    id='location'
                    onChange={this.handleSearch}
                  >
                    <option value={searchLocation}>
                      {searchLocation === 'ro' ? 'Romania' : 'World'}
                    </option>
                    <option value={searchLocation === 'ro' ? 'en' : 'ro'}>
                      {searchLocation === 'ro' ? 'World' : 'Romania'}
                    </option>
                  </select>
                </div>

                <div className='navbar__main--dropdown--row'>
                  <label htmlFor='date'>Date</label>
                  <select name='date' id='date' onChange={this.handleSearch}>
                    <option value='anytime'>Anytime</option>
                    <option value='hour'>Past hour</option>
                    <option value='day'>Past 24 hours</option>
                    <option value='week'>Past week</option>
                    <option value='month'>Past month</option>
                  </select>
                </div>

                <div className='navbar__main--dropdown--row'>
                  <label htmlFor='sort'>Sort by</label>
                  <select name='sort' id='sort' onChange={this.handleSearch}>
                    <option value='publishedAt'>Published</option>
                    <option value='popularity'>Popularity</option>
                    <option value='relevancy'>Relevancy</option>
                  </select>
                </div>

                <div className='navbar__main--dropdown--btns'>
                  <button
                    className='navbar__main--dropdown--btns--1'
                    onClick={this.handleClear}
                  >
                    Clear
                  </button>
                  <button
                    className='navbar__main--dropdown--btns--2'
                    type='submit'
                    value='Submit'
                    disabled={searchValue ? false : true}
                  >
                    Submit
                  </button>
                </div>
              </form>
            ) : null}
          </div>
        </div>

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
  userCountry: string;
}

interface LinkDispatchProps {
  signOut: () => void;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userCountry: selectUserCountry,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  signOut: () => dispatch(signOut()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
