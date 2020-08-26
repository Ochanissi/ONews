import React from 'react';
// import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

// import mainLogo from '../../assets/logo.png';
// import defaultLogo from '../../assets/default.png';

import './navbar.styles.scss';

interface NavbarProps extends RouteComponentProps<any> {
  // handleSearch(event: React.SyntheticEvent<HTMLInputElement>): void;
}

interface NavbarState {
  searchValue: string;
}

class Navbar extends React.Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
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

  render(): JSX.Element {
    // const { currentUser } = this.props;
    const { searchValue } = this.state;

    return (
      <nav role='navigation' className='navbar'>
        {/* <Link to='/'>
          <img src={mainLogo} alt='App Logo' className='navbar__logo' />
        </Link> */}

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
            <Link to='/profile'>
              {/* {currentUser ? (
          <img
            src={defaultLogo}
            alt='User Profile'
            className='navbar__secondary--logo'
          />
        ) : ( */}
              <ion-icon name='person-circle'></ion-icon>
              {/* )} */}
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser,
// });

// export default withRouter(connect(mapStateToProps)(Navbar));
export default withRouter(Navbar);
