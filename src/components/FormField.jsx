import React, { useState } from "react";
import classes from "./FormField.module.css";
import { Input } from "./Input";
import { Label } from "./Label";

export const FormField = ({
  id,
  name,
  validation, // should be like { required: true, maxLength: 5, minLength: 2}
  onChange,
  placeholder,
  children,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { required, maxLength, minLength } = validation;
    const newValue = e.target.value;
    let errorMessage = "";

    if (required && !newValue) {
      errorMessage = "This field is required.";
    } else if (maxLength && newValue.length > maxLength) {
      errorMessage = `Must be At most ${maxLength} characters.`;
    } else if (minLength && newValue.length < minLength) {
      errorMessage = `Must be at least ${minLength} characters.`;
    }

    setValue(newValue);
    setError(errorMessage);

    onChange && onChange(e);
  };

  return (
    <div className={classes.form__field}>
      <Label htmlFor={id}>{children}</Label>
      <Input
        type="text"
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {error && <span className={classes['form__field-error']} id={`${id}-error`}>{error}</span>}
    </div>
  );
};
