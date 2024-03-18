import { useState } from 'react';

export interface FormField {
  type: string;
  label: string;
  validation?: string;
  min?: number;
  max?: number;
  mode?: string;
  groupLabel?: string[];
  options?: string[];
}

const useValidation = (schema: FormField[]) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (data: { [key: string]: any }) => {
    console.log(data);
    const newErrors: { [key: string]: string } = {};
    schema.forEach((field) => {
      if (field.validation === 'number') {
        const value = data[field.label];
        if (isNaN(value) || value < field.min! || value > field.max!) {
          newErrors[field.label] = `Invalid ${field.label}`;
        }
      }
      // Add more validation logic for other field types as needed
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default useValidation;

