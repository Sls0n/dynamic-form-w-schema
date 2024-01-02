export const contactJson = {
  title: "Contact Form",
  fields: [
    {
      label: "Name",
      formType: "text",
      name: "name",
      placeholder: "Enter your name",
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    {
      label: "Email",
      formType: "email",
      name: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      label: "Message",
      formType: "textarea",
      name: "message",
      placeholder: "Enter your message",
      required: true,
      minLength: 20,
      maxLength: 100,
    },
    {
      label: "Gender",
      formType: "radio",
      name: "gender",
      required: true,
      options : [
        {id: 1,
        value : 'Male'}, {
          id: 2,
          value: 'Female'
        }
      ]
    },
  ]
}

export const jobApplicationForm = {
  title: "Job Application Form",
  fields: [
    {
      label: "Applicant's name",
      formType: "text",
      name: "name",
      placeholder: "Enter your name",
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    {
      label: "Applicant's email",
      formType: "email",
      name: "email",
      placeholder: "Enter your email",
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    {
      label: "Work Experience",
      formType: "number",
      name: "experience",
      placeholder: "Eg: 1 years",
      required: true,
      min: 1,
      max: 10,
    },
    {
      label: 'State',
      formType: 'select',
      name: 'state',
      required: true,
      options: [
        {id: 1, value : ''},
        {id: 1, value : 'Bagmati province'},
         {
          id: 2, value: 'Gandaki province' }
      ]
    }
  ]
}