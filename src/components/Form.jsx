import React, { useEffect, useState } from "react";
import { validate } from "../utils/validate-fn";
import classes from "./Form.module.css";
import { generateFormFields } from "./FormFields";

export const Form = ({ schema, data, onSubmit, validationMode = "onAll" }) => {
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

  const runValidation = (data, schema, property) => {
    const { isValid, errors } = validate(data, schema);

    if (!isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [property]: errors[property],
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;

    const updatedFormData = {
      ...formData,
      [name]: type === 'file' ? (files[0] || '') : value,
    };

    setFormData(updatedFormData);

    if (validationMode === "onChange" || validationMode === "onAll") {
      runValidation(updatedFormData, schema, name);
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    if (validationMode === "onBlur" || validationMode === "onAll") {
      runValidation(formData, schema, name);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { errors, isValid } = validate(formData, schema);

    if (validationMode === "onSubmit" || validationMode === "onAll") {
      setErrors(errors);
    }

    if (!isValid) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h1 className={classes.form__header}>Dynamic Form</h1>

      {/* Instead of mapping schema, we do this */}
      {generateFormFields(schema, formData, handleChange, handleBlur, errors)}

      <button className={classes.form__submit} type="submit">
        Submit
      </button>
    </form>
  );
};
