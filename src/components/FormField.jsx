import React, { useState, useEffect } from "react";
import classes from "./FormField.module.css";
import { Input } from "./Input";
import { Label } from "./Label";
import { FormContext } from "./Form";

const validate = (value, validation) => {
  const { required, maxLength, minLength } = validation;
  let errorMessage = "";

  if (required && !value) {
    errorMessage = "This field is required.";
  } else if (maxLength && value.length > maxLength) {
    errorMessage = `Must be At most ${maxLength} characters.`;
  } else if (minLength && value.length < minLength) {
    errorMessage = `Must be at least ${minLength} characters.`;
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
  value: initialValue,
  defaultValue,
  children,
}) => {
  const [value, setValue] = useState(initialValue || defaultValue || "");
  const { errors, setErrors, isSubmitted } = React.useContext(FormContext);

  const handleChange = (e) => {
    const errorMessage = validate(e.target.value, validation);
    setValue(e.target.value);
    setErrors((prevErrors) => {
      // if there is an error message, add it to the errors object, otherwise remove it
      if (errorMessage) {
        return { ...prevErrors, [id]: errorMessage };
      } else {
        const { [id]: value, ...remainingErrors } = prevErrors;
        return remainingErrors;
      }
    });

    onChange && onChange(e);
  };

  useEffect(() => {
    if (isSubmitted) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

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
