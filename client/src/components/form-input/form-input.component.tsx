import React from 'react';

import './form-input.styles.scss';

interface FormInputProps {
  handleChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  handlePasswordVisible?(event: React.MouseEvent<HTMLButtonElement>): void;
  label: string;
  name: string;
  type: string;
  value: string;
  required?: boolean;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  profile?: boolean;
  min?: number;
  max?: number;
  disabled?: boolean;
  rows?: HTMLTextAreaElement;
  password?: boolean;
  passwordVisible?: boolean;
}

const FormInput: React.FunctionComponent<FormInputProps> = ({
  handleChange,
  handlePasswordVisible,
  label,
  profile,
  password,
  passwordVisible,
  ...otherProps
}): JSX.Element => (
  <div className={`form-input ${profile ? 'form-input__profile' : ''}`}>
    {label ? (
      <label
        className={`form-input__label ${
          profile ? 'form-input__label--profile' : ''
        }`}
      >
        {label}
      </label>
    ) : null}
    <input
      className={`form-input__input ${
        profile ? 'form-input__input--profile' : ''
      }`}
      onChange={handleChange}
      {...otherProps}
    />
    {password ? (
      <button
        className={`form-input__icon ${
          profile ? '' : 'form-input__icon--liner'
        } ${passwordVisible ? 'form-input__icon--visible' : ''}`}
        onClick={handlePasswordVisible}
      >
        <ion-icon name={`eye${passwordVisible ? '' : '-off'}`}></ion-icon>
      </button>
    ) : null}
  </div>
);

export default FormInput;
