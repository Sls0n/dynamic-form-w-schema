import React, { forwardRef } from "react";

export const Input = forwardRef(
  ({ type, name, id, value, onChange, ...props }, ref) => {
    return (
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        ref={ref}
        {...props}
      />
    );
  }
);
