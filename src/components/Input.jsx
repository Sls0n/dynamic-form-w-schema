import React, { forwardRef } from "react";
import classes from "./Input.module.css";

export const Input = forwardRef(
  ({ type, name, id, value, onChange, defaultValue, ...props }, ref) => {
    return (
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        ref={ref}
        className={classes["form__field-input"]}
        {...props}
      />
    );
  }
);
