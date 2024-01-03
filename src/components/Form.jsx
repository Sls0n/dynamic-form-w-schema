import React, { useState } from "react";
import classes from "./Form.module.css";
import { useEffect } from "react";
import { generateFormFields } from "./FormFields";

export const Form = ({ schema, data, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Initializing form to empty values, so that when the field aren't touched, they will still show error on submit initially
  useEffect(() => {
    const initialData = {};
    const initialErrors = {};

    if (schema) {
      schema.forEach((field) => {
        initialData[field.name] = "";
        initialErrors[field.name] = "";
      });
    }

    setFormData(initialData);
    setErrors(initialErrors);
  }, [schema]);

  // If data is passed, it sets the form data to the data passed
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // if the field is touched again, it removes the error temporarily
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newError = {};
    let isValid = true;

    schema.forEach((field) => {
      if (field.validation?.required && !formData[field.name]) {
        newError[field.name] = field.errorMessage;
        isValid = false;
      }

      if (
        field.validation?.minLength &&
        formData[field.name]?.length < field.validation.minLength
      ) {
        newError[field.name] = field.errorMessage;
        isValid = false;
      }

      if (
        field.validation?.maxLength &&
        formData[field.name]?.length > field.validation.maxLength
      ) {
        newError[field.name] = field.errorMessage;
        isValid = false;
      }

      if (
        field.validation?.min &&
        formData[field.name] < field.validation.min
      ) {
        newError[field.name] = field.errorMessage;
        isValid = false;
      }

      if (
        field.validation?.max &&
        formData[field.name] > field.validation.max
      ) {
        newError[field.name] = field.errorMessage;
        isValid = false;
      }

      if (
        field.validation?.pattern &&
        !field.validation.pattern.test(formData[field.name])
      ) {
        newError[field.name] = field.errorMessage;
        isValid = false;
      }
    });

    setErrors(newError);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h1 className={classes.form__header}>Dynamic Form</h1>
      {/* {schema.map((field) => {
        if (field.type === "text" || field.type === "number")
          return (
            <InputField
              key={field.name}
              id={field.name}
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              handleChange={handleChange}
              placeholder={field.placeholder}
              error={errors[field.name]}
            >
              {field.label}
            </InputField>
          );
        else if (field.type === "select")
          return (
            <SelectField
              key={field.name}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              handleChange={handleChange}
              error={errors[field.name]}
              options={field.options}
            >
              {field.label}
            </SelectField>
          );
        else if (field.type === "radio")
          return (
            <RadioField
              key={field.name}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              handleChange={handleChange}
              placeholder={field.placeholder}
              error={errors[field.name]}
              options={field.options}
              checked={formData[field.name]}
            >
              {field.label}
            </RadioField>
          );
        else if (field.type === "textarea")
          return (
            <TextAreaField
              key={field.name}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              handleChange={handleChange}
              placeholder={field.placeholder}
              error={errors[field.name]}
            >
              {field.label}
            </TextAreaField>
          );
        else return null;
      })} */}

      {/* Instead of mapping schema like above, we do this */}
      {generateFormFields(schema, formData, handleChange, errors)}

      <button className={classes.form__submit} type="submit">
        Submit
      </button>
    </form>
  );
};
