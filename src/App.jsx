import React, { useState } from "react";

import classes from "./App.module.css";
import { contactSchema, jobApplicationSchema } from "./utils/form-schemas";
import { contactData, jobApplicationData } from "./utils/dummy-data";
import { Form } from "./components/Form";

function App() {
  const [currentSchema, setCurrentSchema] = useState(jobApplicationSchema);
  const [formData, setFormData] = useState({});
  const [outputData, setOutputData] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const switchSchemaHandler = () => {
    // if currentSchema is contactSchema, set it to jobApplicationSchema
    currentSchema === contactSchema
      ? setCurrentSchema(jobApplicationSchema)
      : setCurrentSchema(contactSchema);
  };

  const fetchDummyData = async () => {
    setIsFetching(true);

    const dummyData =
      currentSchema === contactSchema ? contactData : jobApplicationData;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setFormData(dummyData);
    setIsFetching(false);

    console.log("Fetched data: ", dummyData);
  };

  return (
    <div className={classes.container}>
      <Form
        key={currentSchema}
        schema={currentSchema}
        onSubmit={(data) => {
          setOutputData(data);
          console.log("Submitted data: ", data);
        }}
        data={formData}
      />

      <hr className={classes.divider} />

      {/* button to fake fetch data */}
      <button onClick={fetchDummyData} className={classes["fetch-button"]}>
        {isFetching ? "Fetching..." : "Fetch dummy data"}
      </button>

      {/* button to switch schema */}
      <button
        onClick={switchSchemaHandler}
        className={classes["switch-button"]}
      >
        Switch to{" "}
        {currentSchema === contactSchema ? "Job Application" : "Contact"} form
      </button>

      <hr className={classes.divider} />

      <pre className={classes["json-output"]}>
        <code>{JSON.stringify(outputData, null, 2)}</code>
      </pre>
    </div>
  );
}

export default App;
