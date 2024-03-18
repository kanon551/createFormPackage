import React from 'react'
import { useForm } from 'react-hook-form';
import useValidation, { FormField } from '../utils/useValidation';

interface HomeProps {
    schema: FormField[]
}
const Home = ({ schema }: HomeProps) => {

    const { register, handleSubmit } = useForm();
  const { errors, validate } = useValidation(schema);

  const onSubmit = (data: { [key: string]: any }) => {
    const isValid = validate(data);
    if (isValid) {
      console.log(data); // Handle form submission data
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {schema.map((field, index) => (
        <div key={index}>
          {field.type === 'text' && (
            <input {...register(`${field.label}`)} placeholder={`${field.label}`} />
          )}
          {/* Handle other field types similarly */}
          {errors[field.label] && <span>{errors[field.label]}</span>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  )
}

export default Home
