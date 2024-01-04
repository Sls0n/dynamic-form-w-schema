import React, { forwardRef } from "react";
import classes from "./InputField.module.css";
import { Label } from "../Label";
import { ErrorMessage } from "../ErrorMessage";

const Input = forwardRef(
  (
    { type, name, id, value, onChange, defaultValue, onBlur, ...props },
    ref
  ) => {
    return (
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        className={classes["input__field-input"]}
        {...props}
      />
    );
  }
);

export const InputField = ({
  id,
  type,
  name,
  value,
  handleChange,
  handleBlur,
  placeholder,
  children,
  error,
}) => {
  return (
    <div className={classes.input__field}>
      <Label htmlFor={id}>{children}</Label>
      <Input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
      <ErrorMessage error={error} />
    </div>
  );
};
