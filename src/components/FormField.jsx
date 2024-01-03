import React, { useState, useEffect } from "react";
import classes from "./FormField.module.css";
import { Input } from "./Input";
import { Label } from "./Label";
import { FormContext } from "./Form";

const validate = (value, validation) => {
  const { required, maxLength, minLength, pattern } = validation;
  let errorMessage = "";

  if (required && !value) {
    errorMessage = "This field is required.";
  } else if (maxLength && value.length > maxLength) {
    errorMessage = `Must be At most ${maxLength} characters.`;
  } else if (minLength && value.length < minLength) {
    errorMessage = `Must be at least ${minLength} characters.`;
  } else if (pattern && !pattern.test(value)) {
    errorMessage = "Invalid email.";
  }

  return errorMessage;
};

export const FormField = ({
  id,
  type,
  name,
  validation, // should be like { required: true, maxLength: 5, minLength: 2}
  onChange,
  placeholder,
  value,
  children,
}) => {
  const { errors, setErrors, isSubmitted } = React.useContext(FormContext);

  const handleError = (value) => {
    const errorMessage = validate(value, validation);
    setErrors((prevErrors) => {
      // if there is an error message, add it to the errors object, otherwise remove it
      if (errorMessage) {
        return { ...prevErrors, [id]: errorMessage };
      } else {
        const { [id]: value, ...remainingErrors } = prevErrors;
        return remainingErrors;
      }
    });
  };

  const handleChange = (e) => {
    // handleError(e.target.value);
    onChange && onChange(e);
  };

  useEffect(() => {
    handleError(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={classes.form__field}>
      <Label htmlFor={id}>{children}</Label>
      <Input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {isSubmitted && errors[id] && (
        <p className={classes["form__field-error"]}>{errors[id]}</p>
      )}
    </div>
  );
};
