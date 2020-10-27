import React from 'react';
import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';

import defaultLogo from '../../assets/default.png';

import kk from '../../../../public/img/users/user-kek-1603815835070.jpeg';

import './profile-settings.styles.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../redux/store';
import { User, UserUpdate } from '../../redux/user/user.types';
import { createStructuredSelector } from 'reselect';
import {
  updateUserDataStartAsync,
  updateUserPasswordStartAsync,
  updateUserPhotoStartAsync,
} from '../../redux/user/user.actions';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../../.env' });
}

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
  newPass: string;
  newPassConfirm: string;
  oldPassVisible: boolean;
  newPassVisible: boolean;
  newPassConfirmVisible: boolean;
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
      newPass: '',
      newPassConfirm: '',
      oldPassVisible: false,
      newPassVisible: false,
      newPassConfirmVisible: false,
    };
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.currentUser.photo !== prevProps.currentUser.photo) {
      this.setState<any>({
        photo: this.props.currentUser.photo,
      });
      // console.log(this.props.currentUser.photo);
    }
  }

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;

    if (name === 'photo') {
      // Upload photo
      const { updateUserPhotoStartAsync } = this.props;

      const { email } = this.state;

      // console.log(event.target.files[0]);

      const { files }: any = event.target;

      const formData = new FormData();

      formData.append('photo', files[0]);
      formData.append('email', email);

      updateUserPhotoStartAsync(formData);

      // this.setState<any>({
      //   [name]: `user-${email.replace(/[^\w\d]/g, '')}-${Date.now()}.jpeg`,
      // });

      // console.log(formData);

      // axios({
      //   method: 'patch',
      //   url: 'http://localhost:5008/profile',
      //   data: {
      //     kek: 'kek',
      //   },
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // })
      //   .then(function (response) {
      //     //handle success
      //     console.log(response);
      //   })
      //   .catch(function (response) {
      //     //handle error
      //     console.log(response);
      //   });

      // updateUserDataStartAsync({ email, formData });

      // for (var key of formData.entries()) {
      //   console.log(key[0] + ', ' + key[1]);
      // }

      // if (formData) {
      //   fetch(`http://localhost:5008/profile`, {
      //     method: 'PATCH',
      //     body: formData,
      //   });
      // }

      // .then(images => {
      //   this.setState({
      //     uploading: false,
      //     images
      //   })
      // })
      // }

      // profile

      // updateUserDataStartAsync(formData as any);

      // console.log(files[0]);

      // this.setState<any>({ photo: event.target.files[0] });
    } else {
      this.setState<any>({ [name]: value });
    }

    // console.log(event.target.files[0]);

    // const { files } = event.target;
    // const localImageUrl = window.URL.createObjectURL(files[0]);

    // this.props.onFileLoaded(localImageUrl);

    // console.log(localImageUrl);

    // console.log(this.state);
    // console.log({ name, value });
  };

  handleSubmitPublic = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { email, name, age, occupation, country, about } = this.state;

    const { updateUserDataStartAsync } = this.props;

    updateUserDataStartAsync({
      email,
      name,
      age,
      occupation,
      country,
      about,
    });
  };

  handleClearPublic = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const {
      currentUser: { name, age, occupation, country, about },
    } = this.props;

    this.setState({
      name,
      age,
      occupation,
      country,
      about,
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
      currentUser: { phone },
    } = this.props;

    this.setState({
      phone,
    });
  };

  handleSubmitSecurity = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { email, oldPass, newPass, newPassConfirm } = this.state;
    const { updateUserPasswordStartAsync } = this.props;

    if (newPass === newPassConfirm) {
      // const newPass

      updateUserPasswordStartAsync(email, oldPass, newPass);

      this.setState({
        oldPass: '',
        newPass: '',
        newPassConfirm: '',
      });
    } else {
      // make a notification here
      console.log("Passwords don't match!");
    }
  };

  handleClearSecurity = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    this.setState({
      oldPass: '',
      newPass: '',
      newPassConfirm: '',
    });
  };

  handlePasswordVisible = (
    event: React.MouseEvent<HTMLButtonElement>,
    elem: string
  ): void => {
    event.preventDefault();

    this.setState<any>({
      [elem]: !this.state[
        elem as 'oldPassVisible' | 'newPassVisible' | 'newPassConfirmVisible'
      ],
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
      newPass,
      newPassConfirm,
      oldPassVisible,
      newPassVisible,
      newPassConfirmVisible,
    } = this.state;

    // console.log(this.props);

    console.log(this.props);

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
                      src={
                        `${process.env.REACT_APP_ONEWS_BACKEND_URL}img/users/${photo}` ||
                        defaultLogo
                      }
                      // onload={`${process.env.REACT_APP_ONEWS_BACKEND_URL}img/users/${photo}`}
                      alt='Current User'
                    />

                    <input
                      type='file'
                      id='files'
                      className='form-input__photo--text'
                      name='photo'
                      accept='image/*'
                      placeholder='••••••••'
                      onChange={this.handleChange}
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
                  placeholder='0722 222 222'
                  minLength={8}
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
                  type={oldPassVisible ? 'text' : 'password'}
                  value={oldPass || ''}
                  handleChange={this.handleChange}
                  handlePasswordVisible={(event) =>
                    this.handlePasswordVisible(event, 'oldPassVisible')
                  }
                  required
                  label='Current Password'
                  placeholder='••••••••'
                  minLength={8}
                  profile
                  password
                  passwordVisible={oldPassVisible}
                />

                <FormInput
                  name='newPass'
                  type={newPassVisible ? 'text' : 'password'}
                  value={newPass || ''}
                  handleChange={this.handleChange}
                  handlePasswordVisible={(event) =>
                    this.handlePasswordVisible(event, 'newPassVisible')
                  }
                  required
                  label='New Password'
                  placeholder='••••••••'
                  minLength={8}
                  profile
                  password
                  passwordVisible={newPassVisible}
                />

                <FormInput
                  name='newPassConfirm'
                  type={newPassConfirmVisible ? 'text' : 'password'}
                  value={newPassConfirm || ''}
                  handleChange={this.handleChange}
                  handlePasswordVisible={(event) =>
                    this.handlePasswordVisible(event, 'newPassConfirmVisible')
                  }
                  required
                  label='Confirm Password'
                  placeholder='••••••••'
                  minLength={8}
                  profile
                  password
                  passwordVisible={newPassConfirmVisible}
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
  updateUserPasswordStartAsync: (
    email: string,
    oldPass: string,
    newPass: string
  ) => void;
  updateUserPhotoStartAsync: (formData: FormData) => void;
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
  updateUserPasswordStartAsync: (email, oldPass, newPass) =>
    dispatch(updateUserPasswordStartAsync(email, oldPass, newPass)),
  updateUserPhotoStartAsync: (formData) =>
    dispatch(updateUserPhotoStartAsync(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
