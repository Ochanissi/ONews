import React from 'react';
import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';

import defaultLogo from '../../assets/default.png';

import './profile-settings.styles.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../redux/store';
import { User, UserUpdate } from '../../redux/user/user.types';
import { createStructuredSelector } from 'reselect';
import { updateUserDataStartAsync } from '../../redux/user/user.actions';

interface ProfileSettingsProps {}

interface ProfileSettingsState {
  name: string;
  email: string;
  occupation: string;
  age: string;
  country: string;
  phone: string;
  about: string;
  photo: string;
  joined: string;
  oldPass: string;
  newPass1: string;
  newPass2: string;
}

type Props = ProfileSettingsProps & LinkDispatchProps & LinkStateProps;

class ProfileSettings extends React.Component<Props, ProfileSettingsState> {
  constructor(props: Props) {
    super(props);

    const {
      currentUser: {
        name,
        email,
        occupation,
        age,
        country,
        phone,
        about,
        photo,
        joined,
      },
    } = this.props;

    this.state = {
      name,
      email,
      age,
      occupation,
      country,
      phone,
      about,
      photo,
      joined,
      oldPass: '',
      newPass1: '',
      newPass2: '',
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    this.setState<any>({ [name]: value });
  };

  handleSubmitPublic = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { email, name, age, occupation, country, about, photo } = this.state;

    const { updateUserDataStartAsync } = this.props;

    updateUserDataStartAsync({
      email,
      name,
      age,
      occupation,
      country,
      about,
      photo,
    });
  };

  handleClearPublic = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const {
      currentUser: { name, age, occupation, country, about, photo },
    } = this.props;

    this.setState({
      name,
      age,
      occupation,
      country,
      about,
      photo,
    });
  };

  handleSubmitContact = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { email, phone } = this.state;

    const { updateUserDataStartAsync } = this.props;

    updateUserDataStartAsync({
      email,
      phone,
    });
  };

  handleClearContact = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const {
      currentUser: { name, phone },
    } = this.props;

    this.setState({
      name,
      phone,
    });
  };

  handleSubmitSecurity = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // const { email, phone } = this.state;

    // const { updateUserDataStartAsync } = this.props;

    // updateUserDataStartAsync({
    //   email,
    //   phone,
    // });
  };

  handleClearSecurity = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    this.setState({
      oldPass: '',
      newPass1: '',
      newPass2: '',
    });
  };

  render(): JSX.Element {
    const {
      name,
      email,
      occupation,
      age,
      country,
      phone,
      about,
      photo,
      joined,
      oldPass,
      newPass1,
      newPass2,
    } = this.state;

    // console.log(this.props);

    return (
      <div className='profile-settings'>
        <div className='profile-settings__content'>
          <h2 className='profile-settings__content--header'>Personal info</h2>
          <h4 className='profile-settings__content--sub-header'>
            Basic info, like your name and photo, that you use on ONews services
          </h4>

          <div className='profile-settings__content--blocks'>
            <form
              className='profile-settings-block'
              onSubmit={this.handleSubmitPublic}
            >
              <h3 className='profile-settings-block__header'>Public info</h3>
              <h4 className='profile-settings-block__sub-header'>
                Some info may be visible to other people using ONews services.
              </h4>
              <div className='profile-settings-block__content'>
                <div className='form-input__photo--container'>
                  <label className='form-input__label--profile'>photo</label>
                  <div className='form-input__photo'>
                    <img
                      className='form-input__photo--image'
                      src={defaultLogo}
                      alt='Current User'
                    />

                    <input
                      type='file'
                      id='files'
                      className='form-input__photo--text'
                      name='photo'
                      accept='image/*'
                      placeholder='••••••••'
                    />
                    <label
                      htmlFor='files'
                      className='custom-button custom-button__profile'
                      id='form-input__photo--btn'
                    >
                      <ion-icon name='camera'></ion-icon>
                    </label>
                  </div>
                </div>

                <FormInput
                  name='name'
                  type='text'
                  value={name || ''}
                  handleChange={this.handleChange}
                  required
                  label='Your name'
                  placeholder='John Doe'
                  maxLength={50}
                  profile
                />
                <FormInput
                  name='age'
                  type='number'
                  value={age || ''}
                  handleChange={this.handleChange}
                  label='Age'
                  placeholder='How old are you.'
                  min={12}
                  max={110}
                  profile
                />

                <FormInput
                  name='occupation'
                  type='text'
                  value={occupation || ''}
                  handleChange={this.handleChange}
                  label='Occupation'
                  placeholder='What do you do for a living.'
                  maxLength={50}
                  profile
                />
                <FormInput
                  name='country'
                  type='text'
                  value={country || ''}
                  handleChange={this.handleChange}
                  label='Country'
                  placeholder='Which country you are from.'
                  maxLength={50}
                  profile
                />

                <div className='form__input form-input__profile'>
                  <label className='form-input__label form-input__label--profile'>
                    About yourself
                  </label>
                  <textarea
                    className='form-input__input form-input__input--profile'
                    name='about'
                    onChange={this.handleChange}
                    placeholder='Tell us about yourself.'
                    maxLength={200}
                    rows={3}
                    value={about || ''}
                  ></textarea>
                </div>

                <div className='profile-settings-block__content--btns'>
                  <button
                    className='profile-settings-block__content--btns--1'
                    onClick={this.handleClearPublic}
                  >
                    Clear
                  </button>

                  <button
                    className='profile-settings-block__content--btns--2'
                    type='submit'
                    value='Submit'
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>

            <form
              className='profile-settings-block'
              onSubmit={this.handleSubmitContact}
            >
              <h3 className='profile-settings-block__header'>Contact info</h3>
              <h4 className='profile-settings-block__sub-header'>
                This info is not shared with other people.
              </h4>
              <div className='profile-settings-block__content'>
                <FormInput
                  name='email'
                  type='email'
                  value={email || ''}
                  handleChange={this.handleChange}
                  required
                  label='Email Address'
                  placeholder='example@google.com'
                  disabled
                  profile
                />

                <FormInput
                  name='phone'
                  type='tel'
                  value={phone || ''}
                  handleChange={this.handleChange}
                  required
                  label='Phone Number'
                  placeholder='123-456-7890'
                  profile
                />
                <div className='profile-settings-block__content--btns'>
                  <button
                    className='profile-settings-block__content--btns--1'
                    onClick={this.handleClearContact}
                  >
                    Clear
                  </button>

                  <button
                    className='profile-settings-block__content--btns--2'
                    type='submit'
                    value='Submit'
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>

            <form
              className='profile-settings-block'
              onSubmit={this.handleSubmitSecurity}
            >
              <h3 className='profile-settings-block__header'>Security</h3>
              <h4 className='profile-settings-block__sub-header'>
                Settings and recommendations to help you keep your account
                secure.
              </h4>
              <div className='profile-settings-block__content'>
                <FormInput
                  name='oldPass'
                  type='password'
                  value={oldPass || ''}
                  handleChange={this.handleChange}
                  required
                  label='Current Password'
                  placeholder='••••••••'
                  minLength={8}
                  profile
                />

                <FormInput
                  name='newPass1'
                  type='password'
                  value={newPass1 || ''}
                  handleChange={this.handleChange}
                  required
                  label='New Password'
                  placeholder='••••••••'
                  minLength={8}
                  profile
                />

                <FormInput
                  name='newPass2'
                  type='password'
                  value={newPass2 || ''}
                  handleChange={this.handleChange}
                  required
                  label='Confirm Password'
                  placeholder='••••••••'
                  minLength={8}
                  profile
                />
                <div className='profile-settings-block__content--btns'>
                  <button
                    className='profile-settings-block__content--btns--1'
                    onClick={this.handleClearSecurity}
                  >
                    Clear
                  </button>

                  <button
                    className='profile-settings-block__content--btns--2'
                    type='submit'
                    value='Submit'
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

interface LinkDispatchProps {
  updateUserDataStartAsync: (user: UserUpdate) => void;
}

interface LinkStateProps {
  currentUser: User;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  updateUserDataStartAsync: (user) => dispatch(updateUserDataStartAsync(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
