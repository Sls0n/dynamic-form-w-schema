import React, { useState } from "react";

import classes from "./App.module.css";
import Form from "./components/Form";
import { contactJson, jobApplicationForm } from "./utils/form-schemas";

function App() {
  const [currentSchema, setCurrentSchema] = useState(jobApplicationForm);
  const [outputData, setOutputData] = useState({});

  const switchSchemaHandler = () => {
    // if currentSchema is contactJson, set it to jobApplicationForm
    currentSchema === contactJson
      ? setCurrentSchema(jobApplicationForm)
      : setCurrentSchema(contactJson);
  };

  return (
    <div className={classes.container}>
      <Form
        // added key to re-render the component when the schema changes so that it resets the form
        key={currentSchema.title}
        schema={currentSchema}
        onSubmit={(formData) => {
          setOutputData(formData);
        }}
      />

      <hr className={classes.divider} />

      {/* button to switch schema */}
      <button
        onClick={switchSchemaHandler}
        className={classes["switch-button"]}
      >
        Switch to{" "}
        {currentSchema === contactJson ? "Job Application" : "Contact"} form
      </button>

      <hr className={classes.divider} />

      <pre className={classes["json-output"]}>
        <code>{JSON.stringify(outputData, null, 2)}</code>
      </pre>
    </div>
  );
}

export default App;
