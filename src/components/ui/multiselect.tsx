import Select from "react-select";

export const MultiSelect = ({ givenOptions, formData, setFormData }) => {
  const handleChange = (selectedOptions) => {
    setFormData(selectedOptions.map((option) => option.value));
  };

  console.log(formData);

  const values = [];
  formData.forEach((element) => {
    values.push({ value: element, label: element });
  });

  console.log(values);

  const options = givenOptions.map((option) => ({
    value: option,
    label: option,
  }));

  return (
    <Select
      isMulti
      value={values}
      onChange={handleChange}
      options={options}
      className="w-full text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
      placeholder="Select multiple options..."
    />
  );
};
