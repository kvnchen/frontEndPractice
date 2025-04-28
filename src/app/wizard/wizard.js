'use client';
import { useState } from 'react';

/**
 * Task: Implement a multi-step form (e.g., a signup or checkout process). 
 * 
 * Each step should have its own set of fields and validation rules. 
 * Users can only proceed to the next step if the current step is valid. 
 * The form state must be maintained as the user navigates back and forth between steps.
 * 
 * Focus: Complex state management, form handling, input validation logic, conditional rendering.
 * 
 * dynamic state variables don't seem like a good idea
 * 
 */

const forms = [
  {
    name: {
      type: 'text',
      label: 'Name',
      validation: {
        minlength: 4,
        maxlength: 20,
        required: true,
      }
    },
    phone: {
      type: 'text',
      label: 'Phone Number',
      validation: {
        minlength: 10,
        maxlength: 15,
        required: true,
      }
    },
    email: {
      type: 'email',
      label: 'Email Address',
      validation: {
        minlength: 5,
        maxlength: 30,
        required: true,
        pattern: '.+@.+\\..+'
      }
    }
  },
  {
    isAdult: {
      type: 'checkbox',
      label: 'I am at least 18 years old',
      validation: {
        required: true,
      }
    }
  }
];

export function Wizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isAdult, setisAdult] = useState(false);

  const fieldToStateMap = {
    'name': [name, setName],
    'phone': [phone, setPhone],
    'email': [email, setEmail],
    'isAdult': [isAdult, setisAdult]
  };

  function validate(formFields) {
    for (const field of Object.keys(formFields)) {
      const properties = formFields[field];
      
      if (properties.validation) {
        const val = fieldToStateMap[field][0];

        if (properties.validation.minlength && val.length < Number(properties.validation.minlength))
          return false;

        if (properties.validation.maxlength && val.length > Number(properties.validation.maxlength))
          return false;

        if (properties.validation.required && (val === '' || val === null || val === undefined))
          return false;

        if (properties.validation.pattern && val.match(new RegExp(properties.validation.pattern)) === null) {
          return false;
        }

        if (properties.type === 'checkbox' && !val) {
          return false;
        }
      }
    }

    return true;
  }

  function handleSubmit() {
    const output = {};

    for (const field of Object.keys(fieldToStateMap)) {
      output[field] = fieldToStateMap[field][0];
    }

    console.log(output);
  }
  
  function renderForm(formFields) {
    const fields = [];

    for (const field of Object.keys(formFields)) {
      const properties = formFields[field];
      const isCheckbox = properties.type === 'checkbox';

      fields.push(
        <div key={field}>
          <label>
            {properties.label}
            <input 
              type={properties.type} 
              name={field} 
              value={fieldToStateMap[field][0]}
              checked={isCheckbox ? fieldToStateMap[field][0] : null}
              onChange={(e) => {
                const prop = isCheckbox ? 'checked' : 'value';
                fieldToStateMap[field][1](e.target[prop]);
              }}
              required={properties.validation.required}
              minLength={properties.validation.minlength}
              maxLength={properties.validation.maxlength}
              pattern={properties.validation.pattern ? properties.validation.pattern : null}
            />
            {/* {'val:' + fieldToStateMap[field][0]} */}
          </label>
        </div>
      );
    }

    return (
      <form>
        {fields}
      </form>
    )
  }

  return (
    <div>
      {renderForm(forms[currentStep])}
      <div>
        <button
          type='button'
          disabled={currentStep === 0}
          onClick={() => {
            if (currentStep > 0)
              setCurrentStep(currentStep - 1);
          }}
        >
          Back
        </button>
        <button 
          type='button' 
          disabled={!validate(forms[currentStep])}
          onClick={() => {
            if (currentStep < forms.length - 1)
              setCurrentStep(currentStep + 1);
            else 
              handleSubmit();
          }}
        >
          {currentStep === forms.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  )
}