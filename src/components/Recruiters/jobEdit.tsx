import React from "react";
import Select from "react-select";

export const CategorySelectList = ({
  givenOptions,
  formData,
  setFormData,
  salaryIndex,
}) => {
  const handleChange = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    const updatedSalary = {
      ...formData.salaries[salaryIndex],
      categories: values,
    };
    const updatedSalaries = formData.salaries?.map((salary, i) => {
      if (i === salaryIndex) {
        return updatedSalary;
      }
      return salary;
    });
    setFormData((prevData) => ({
      ...prevData,
      salaries: updatedSalaries,
    }));
  };

  const options = givenOptions.map((option) => ({
    value: option,
    label: option,
  }));

  return (
    <Select
      isMulti
      value={formData.salaries[salaryIndex].categories?.map((category) => ({
        value: category,
        label: category,
      }))}
      onChange={handleChange}
      options={options}
      className="w-full text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
      placeholder="Select multiple options..."
    />
  );
};

export const GenderSelectList = ({
  givenOptions,
  formData,
  setFormData,
  salaryIndex,
}) => {
  const handleChange = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    const updatedSalary = {
      ...formData.salaries[salaryIndex],
      genders: values,
    };
    const updatedSalaries = formData.salaries?.map((salary, i) => {
      if (i === salaryIndex) {
        return updatedSalary;
      }
      return salary;
    });
    setFormData((prevData) => ({
      ...prevData,
      salaries: updatedSalaries,
    }));
  };

  const options = givenOptions.map((option) => ({
    value: option,
    label: option,
  }));

  return (
    <Select
      isMulti
      value={formData.salaries[salaryIndex].genders?.map((gender) => ({
        value: gender,
        label: gender,
      }))}
      onChange={handleChange}
      options={options}
      className="w-full text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
      placeholder="Select multiple options..."
    />
  );
};
