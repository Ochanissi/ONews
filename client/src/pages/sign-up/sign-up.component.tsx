import React from "react";
import { connect } from "react-redux";

import { AppActions } from "../../redux/store";

import { ThunkDispatch } from "redux-thunk";

import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import {
  setUserSidebarMenu,
  setUserWeatherMenu,
  signUpStartAsync,
} from "../../redux/user/user.actions";

import "./sign-up.styles.scss";

import Toast from "light-toast";

interface SignUpState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  passwordVisible: boolean;
  confirmPasswordVisible: boolean;
}

interface SignUpProps {}

type Props = SignUpProps & LinkDispatchProps;

class SignUp extends React.Component<Props, SignUpState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      passwordVisible: false,
      confirmPasswordVisible: false,
    };
  }

  componentDidMount() {
    const { setUserSidebarMenu, setUserWeatherMenu } = this.props;

    setUserSidebarMenu(false);
    setUserWeatherMenu(false);
  }

  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { name, email, password, confirmPassword } = this.state;

    const { signUpStartAsync } = this.props;

    if (password !== confirmPassword) {
      Toast.fail("Passwords don't match!", 1000);
      return;
    }

    signUpStartAsync(name, email, password);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // event.preventDefault();

    const { name, value } = event.target;

    this.setState<any>({ [name]: value });
  };

  handlePasswordVisible = (
    event: React.MouseEvent<HTMLButtonElement>,
    elem: string
  ): void => {
    // event.preventDefault();

    this.setState<any>({
      [elem]: !this.state[elem as "passwordVisible" | "confirmPasswordVisible"],
    });
  };

  render(): JSX.Element {
    const {
      name,
      email,
      password,
      confirmPassword,
      passwordVisible,
      confirmPasswordVisible,
    } = this.state;

    return (
      <div className="sign-up">
        <span className="sign-up__background" />
        <div className="sign-up__content">
          <form className="sign-up__content--form" onSubmit={this.handleSubmit}>
            <h2 className="sign-up__content--form--header">Sign Up</h2>

            <FormInput
              name="name"
              type="text"
              value={name}
              handleChange={this.handleChange}
              required
              label="Display Name"
              placeholder="John Doe"
              maxLength={50}
            />
            <FormInput
              name="email"
              type="email"
              value={email}
              handleChange={this.handleChange}
              required
              label="Email Address"
              placeholder="example@google.com"
            />

            <FormInput
              name="password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              handleChange={this.handleChange}
              handlePasswordVisible={(event) =>
                this.handlePasswordVisible(event, "passwordVisible")
              }
              required
              label="Password"
              placeholder="••••••••"
              minLength={8}
              password
              passwordVisible={passwordVisible}
            />

            <FormInput
              name="confirmPassword"
              type={confirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              handleChange={this.handleChange}
              handlePasswordVisible={(event) =>
                this.handlePasswordVisible(event, "confirmPasswordVisible")
              }
              required
              label="Confirm Password"
              placeholder="••••••••"
              minLength={8}
              password
              passwordVisible={confirmPasswordVisible}
            />

            <div className="sign-up__content--form--btns">
              <CustomButton type="submit">Sign Up</CustomButton>
              <CustomButton link="/auth/sign-in">Sign In</CustomButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

interface LinkDispatchProps {
  signUpStartAsync: (name: string, email: string, password: string) => void;

  setUserSidebarMenu: (bool: boolean) => void;
  setUserWeatherMenu: (bool: boolean) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  signUpStartAsync: (name, email, password) =>
    dispatch(signUpStartAsync(name, email, password)),

  setUserSidebarMenu: (bool) => dispatch(setUserSidebarMenu(bool)),
  setUserWeatherMenu: (bool) => dispatch(setUserWeatherMenu(bool)),
});

export default connect(null, mapDispatchToProps)(SignUp);
