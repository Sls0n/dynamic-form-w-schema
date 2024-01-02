import React, { useState } from "react";
import classes from "./Form.module.css";
import Label from "./Label";

export default function Form({ schema, onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    // pass the formData to the parent component i.e App.jsx to access it there
    onSubmit(formData);
  };

  const inputChangeHandler = (event) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  };

  const radioChangeHandler = (event) => {
    // is same as inputChangeHandler but if need customization needed can be changed from here
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  };

  const selectChangeHandler = (event) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h1 className={classes.form__header}>{schema.title}</h1>

      {/* Conditionally rendering different fields */}
      {schema.fields.map((field) => {
        if (
          field.formType === "text" ||
          field.formType === "email" ||
          field.formType === "number"
        )
          return (
            <div
              className={classes.form__field}
              key={`${field.name} ${field.label}`}
            >
              <Label
                className={classes["form__field-label"]}
                htmlFor={field.name}
              >
                {field.label}
              </Label>
              <input
                className={classes["form__field-input"]}
                type={field.formType}
                name={field.name}
                id={field.name}
                onChange={inputChangeHandler}
                placeholder={field.placeholder}
                required={field.required}
                minLength={field.minLength}
                maxLength={field.maxLength}
                min={field.min}
                max={field.max}
              />
            </div>
          );
        else if (field.formType === "textarea")
          return (
            <div
              className={classes.form__field}
              key={`${field.name} ${field.label}`}
            >
              <label
                className={classes["form__field-label"]}
                htmlFor={field.name}
              >
                {field.label}
              </label>
              <textarea
                className={classes["form__field-input"]}
                name={field.name}
                id={field.name}
                onChange={inputChangeHandler}
                placeholder={field.placeholder}
                required={field.required}
                minLength={field.minLength}
                maxLength={field.maxLength}
              />
            </div>
          );
        else if (field.formType === "radio")
          return (
            <div
              className={classes.form__field}
              key={`${field.name} ${field.label}`}
            >
              <label
                className={classes["form__field-label"]}
                htmlFor={field.name}
              >
                {field.label}
              </label>
              {field.options.map((option) => (
                <div
                  className={classes["form__field-radio"]}
                  key={`${option.value}`}
                >
                  <input
                    className={classes["form__field-input"]}
                    type="radio"
                    name={field.name}
                    id={option.id}
                    value={option.value}
                    onChange={radioChangeHandler}
                    required={field.required}
                  />
                  <label htmlFor={option.id}>{option.value}</label>
                </div>
              ))}
            </div>
          );
        else if (field.formType === "select")
          return (
            <div
              className={classes.form__field}
              key={`${field.name} ${field.label}`}
            >
              <label
                className={classes["form__field-label"]}
                htmlFor={field.name}
              >
                {field.label}
              </label>
              <select
                className={classes["form__field-input"]}
                name={field.name}
                id={field.name}
                onChange={selectChangeHandler}
                required={field.required}
              >
                {field.options.map((option) => (
                  <option
                    className={classes["form__field-input"]}
                    key={`${option.value}`}
                    value={option.value}
                  >
                    {option.value !== "" ? option.value : "Select a state"}
                  </option>
                ))}
              </select>
            </div>
          );
      })}

      <button className={classes.form__submit} type="submit">
        Submit
      </button>
    </form>
  );
}
