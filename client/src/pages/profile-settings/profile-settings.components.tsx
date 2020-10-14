import React from 'react';
import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';

import defaultLogo from '../../assets/default.png';

import './profile-settings.styles.scss';

class ProfileSettings extends React.Component {
  handleChange = () => {
    console.log('lel');
  };

  render(): JSX.Element {
    return (
      <div className='profile-settings'>
        <div className='profile-settings__content'>
          <h2 className='profile-settings__content--header'>Personal info</h2>
          <h4 className='profile-settings__content--sub-header'>
            Basic info, like your name and photo, that you use on ONews services
          </h4>

          <div className='profile-settings__content--blocks'>
            <div className='profile-settings-block'>
              <h3 className='profile-settings-block__header'>Public info</h3>
              <h4 className='profile-settings-block__sub-header'>
                Some info may be visible to other people using ONews services .
              </h4>
              <div className='profile-settings-block__content'>
                <FormInput
                  name='name'
                  type='text'
                  value={'name' || ''}
                  handleChange={this.handleChange}
                  required
                  label='Your name'
                  placeholder='John Doe'
                  maxLength={50}
                  profile
                />
                <FormInput
                  name='email'
                  type='email'
                  value={'email' || ''}
                  handleChange={this.handleChange}
                  required
                  label='Email Address'
                  placeholder='example@google.com'
                  disabled
                  profile
                />
                <FormInput
                  name='age'
                  type='number'
                  value={'age' || ''}
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
                  value={'occupation' || ''}
                  handleChange={this.handleChange}
                  label='Occupation'
                  placeholder='What do you do for a living.'
                  maxLength={50}
                  profile
                />
                <FormInput
                  name='country'
                  type='text'
                  value={'country' || ''}
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
                    value={'about' || ''}
                  ></textarea>
                </div>

                <label className='form-input__label'>Choose new photo</label>
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
                    disabled
                  />
                  <label
                    htmlFor='files'
                    className='custom-button custom-button__profile'
                    id='form-input__photo--btn'
                  >
                    Select file
                  </label>
                </div>

                <div className='profile__settings--form--btn'>
                  <CustomButton type='submit'>Save settings</CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileSettings;
