import React from 'react';
import { connect } from 'react-redux';

import { signInStartAsync } from '../../redux/user/user.actions';
import { AppActions } from '../../redux/store';

import { ThunkDispatch } from 'redux-thunk';

// import LogoForm from '../../assets/logo-form.png';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './sign-in.styles.scss';

interface SignInState {
  email: string;
  password: string;
}

interface SignInProps {}

type Props = SignInProps & LinkDispatchProps;

class SignIn extends React.Component<Props, SignInState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { email, password } = this.state;

    const { signInStartAsync } = this.props;

    signInStartAsync(email, password);

    this.setState({ email: '', password: '' });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;

    this.setState<any>({ [name]: value });
  };

  render(): JSX.Element {
    const { email, password } = this.state;

    return (
      <div className='sign-in'>
        <span className='sign-in__background' />
        <div className='sign-in__content'>
          <form className='sign-in__content--form' onSubmit={this.handleSubmit}>
            <h2 className='sign-in__content--form--header'>Sign In</h2>

            <FormInput
              name='email'
              type='email'
              value={email}
              handleChange={this.handleChange}
              required
              label='Email Address'
              placeholder='example@google.com'
            />
            <FormInput
              name='password'
              type='password'
              value={password}
              handleChange={this.handleChange}
              required
              label='Password'
              placeholder='••••••••'
            />

            <div className='sign-in__content--form--btns'>
              <CustomButton type='submit'>Sign In</CustomButton>
              <CustomButton link='/auth/sign-up'>Sign up</CustomButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

interface LinkDispatchProps {
  signInStartAsync: (email: string, password: string) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  signInStartAsync: (email, password) =>
    dispatch(signInStartAsync(email, password)),
});

export default connect(null, mapDispatchToProps)(SignIn);
