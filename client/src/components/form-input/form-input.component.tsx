import React from 'react';

import './form-input.styles.scss';

interface FormInputProps {
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
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
}

const FormInput: React.FunctionComponent<FormInputProps> = ({
  handleChange,
  label,
  profile,
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
  </div>
);

export default FormInput;
