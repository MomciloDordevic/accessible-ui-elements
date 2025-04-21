import React, { useState } from "react";

const AccessibleForm = () => {
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; agreed?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!agreed) newErrors.agreed = "You must agree to the terms.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-6">
      <div>
        <label htmlFor="name" className="block font-medium text-gray-800 mb-1 text-gray-800 dark:text-gray-200">
          Name <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={`w-full px-3 py-2 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-red-600 mt-1">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex items-start">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          aria-invalid={!!errors.agreed}
          aria-describedby={errors.agreed ? "terms-error" : undefined}
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 text-gray-800 dark:text-gray-200">
          I agree to the terms and conditions
        </label>
      </div>
      {errors.agreed && (
        <p id="terms-error" className="text-sm text-red-600 mt-1">
          {errors.agreed}
        </p>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>

      {submitted && (
        <p className="text-green-600 text-sm mt-2" role="status">
          Form submitted successfully!
        </p>
      )}
    </form>
  );
};

export default AccessibleForm;
