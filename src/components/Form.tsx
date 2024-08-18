import React, { FormEvent } from "react";
import { FormState } from "../types/types";

type FormProps = {
  handleSubmit: (e: FormEvent) => void;
  formData: FormState;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
  buttonText: string;
  disableButton: boolean;
};

const Form = ({
  handleSubmit,
  formData,
  setFormData,
  buttonText,
  disableButton,
}: FormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Sign In</h2>
      <input
        type="text"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Username"
        name="username"
        className="border p-2 w-full mb-4 rounded-md outline-none font-medium text-sm"
        required
      />
      <input
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        name="email"
        className="border p-2 w-full mb-4 rounded-md outline-none font-medium text-sm"
        required
      />
      <input
        type="password"
        value={formData.password}
        name="password"
        onChange={handleInputChange}
        placeholder="Password"
        className="border p-2 w-full mb-4 rounded-md outline-none font-medium text-sm"
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 w-full rounded disabled:bg-blue-300"
        disabled={disableButton}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
