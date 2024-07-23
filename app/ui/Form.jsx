"use client";

// components/DynamicForm.js

import React from 'react';
import { useForm } from 'react-hook-form';
import Dropdown from './Dropdown';

const Form = ({ fields, onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <label htmlFor={field.name} className="text-gray-700">
            {field.label}
          </label>
          {field.type === 'text' && (
            <input
              type="text"
              id={field.name}
              {...register(field.name)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder={field.placeholder}
            />
          )}
          {field.type === 'email' && (
            <input
              type="email"
              id={field.name}
              {...register(field.name)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder={field.placeholder}
            />
          )}
          {field.type === 'password' && (
            <input
              type="password"
              id={field.name}
              {...register(field.name)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder={field.placeholder}
            />
          )}
          {field.type === 'number' && (
            <input
              type="number"
              id={field.name}
              {...register(field.name)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder={field.placeholder}
            />
          )}
          {field.type === 'select' && (
            <Dropdown
              options={field.options}
              name={field.name}
              register={register}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
