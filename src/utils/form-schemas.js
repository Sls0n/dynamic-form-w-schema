export const contactSchema = [
  {
    name: "name",
    label: "Name",
    type: "text",
    validation: {
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    errorMessage: "Name must be between 3 and 20 characters.",
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    validation: {
      required: true,
      minLength: 1,
      pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
    },
    errorMessage: "Please enter a valid email address.",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    validation: {
      required: true,
      minLength: 20,
      maxLength: 200,
    },
    errorMessage: "Message must be between 20 and 200 characters.",
  },
  
];


export const jobApplicationSchema = [
  {
    name: "name",
    label: "Name",
    type: "text",
    validation: {
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    errorMessage: "Name must be between 3 and 20 characters.",
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    validation: {
      required: true,
      min: 18,
      max: 99,
    },
    errorMessage: "You must be between 18 and 99 years old.",
  },
  {
    name: "gender",
    label: "Gender",
    type: "radio",
    options: ["Male", "Female", "Other"],
    validation: {
      required: true,
    },
    errorMessage: "Please select your gender.",
  },
  {
    name: "level",
    label: "Level",
    type: "select",
    options: ['', "Junior", "Senior", "Lead"],
    validation: {
      required: true,
    },
    errorMessage: "Please select a level.",
  },
  {
    name: "photo",
    label: "Photo",
    type: "file",
    validation: {
      required: true,
    },
    errorMessage: "Please add a image.",
  },
];
