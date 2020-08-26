import React from 'react';

import './form-input.styles.scss';

interface FormInputProps {
  handleChange: any;
  label: string;
  name: string;
  type: string;
  value: string;
  required: boolean;
  placeholder: string;
  minLength?: any;
  maxLength?: any;
}

const FormInput = ({ handleChange, label, ...otherProps }: FormInputProps) => (
  <div className='form-input'>
    {label ? <label className='form-input__label'>{label}</label> : null}
    <input
      className='form-input__input'
      onChange={handleChange}
      {...otherProps}
    />
  </div>
);

export default FormInput;
