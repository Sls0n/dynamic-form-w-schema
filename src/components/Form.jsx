import React, { useState } from "react";
import classes from "./Form.module.css";
import { useEffect } from "react";
import { generateFormFields } from "./FormFields";
import { validate } from "../utils/validate-fn";

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

  const handleSubmit = (event) => {
    event.preventDefault();

    // validate helper function returns true if there are no errors
    if (validate(formData, schema, setErrors)) {
      onSubmit(formData);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h1 className={classes.form__header}>Dynamic Form</h1>

      {/* Instead of mapping schema, we do this */}
      {generateFormFields(schema, formData, handleChange, errors)}

      <button className={classes.form__submit} type="submit">
        Submit
      </button>
    </form>
  );
};
