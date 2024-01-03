import React, { useState, createContext } from "react";
import classes from "./Form.module.css";
import { FormField } from "./FormField";
import { contactData, jobApplicationData } from "../utils/dummyData";

export const FormContext = createContext({
  errors: {},
  setErrors: () => {},

  isSubmitted: false,
  setIsSubmitted: () => {},
});

export default function Form({ schema, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    // checking if object is empty
    if (Object.keys(errors).length) return;

    onSubmit(formData);
  };

  const fetchDummyData = async () => {
    setIsFetching(true);

    const dummyData = schema.title.includes("Contact")
      ? contactData
      : jobApplicationData;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setFormData(dummyData);
    setIsFetching(false);

    console.log("Fetched data: ", dummyData);
  };

  const inputChangeHandler = (event) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  };

  return (
    <FormContext.Provider
      value={{ errors, setErrors, isSubmitted, setIsSubmitted }}
    >
      <form className={classes.form} onSubmit={handleSubmit}>
        <h1 className={classes.form__header}>{schema.title}</h1>

        {/* Conditionally rendering different fields */}
        {schema.fields.map((field) => {
          if (field.formType === "text" || field.formType === "number")
            return (
              <FormField
                key={`${field.name} ${field.label}`}
                id={field.name}
                type={field.formType}
                name={field.name}
                value={formData[field.name] || ""}
                validation={{
                  required: true,
                  maxLength: field.maxLength ? field.maxLength : undefined,
                  minLength: field.minLength ? field.minLength : undefined,
                  pattern: field.pattern
                    ? new RegExp(field.pattern)
                    : undefined,
                }}
                placeholder={field.placeholder}
                onChange={inputChangeHandler}
              >
                {field.label}
              </FormField>
            );
        })}

        <button className={classes.form__submit} type="submit">
          Submit
        </button>

        <button
          onClick={fetchDummyData}
          className={classes.form__submit}
          type="button"
        >
          {isFetching ? "Fetching..." : "Fetch dummy data"}
        </button>
      </form>
    </FormContext.Provider>
  );
}
