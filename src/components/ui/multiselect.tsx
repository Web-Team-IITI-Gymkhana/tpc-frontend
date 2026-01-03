import Select from "react-select";

interface MultiSelectProps {
  givenOptions: string[];
  formData: string[];
  setFormData: (data: string[]) => void;
  hasError?: boolean;
}

export const MultiSelect = ({ givenOptions, formData, setFormData, hasError = false }: MultiSelectProps) => {
  const handleChange = (selectedOptions) => {
    setFormData(selectedOptions.map((option) => option.value));
  };

  const values = [];
  formData.forEach((element) => {
    values.push({ value: element, label: element });
  });

  const options = givenOptions.map((option) => ({
    value: option,
    label: option,
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: hasError ? '#ef4444' : state.isFocused ? '#3b82f6' : '#d1d5db',
      borderWidth: '1px',
      boxShadow: hasError 
        ? '0 0 0 1px #ef4444' 
        : state.isFocused 
        ? '0 0 0 1px #3b82f6' 
        : 'none',
      '&:hover': {
        borderColor: hasError ? '#ef4444' : '#3b82f6',
      },
      minHeight: '44px', // h-11 equivalent
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#6b7280',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: hasError ? '#fef2f2' : '#f3f4f6',
      borderColor: hasError ? '#fecaca' : '#e5e7eb',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: hasError ? '#991b1b' : '#374151',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: hasError ? '#991b1b' : '#6b7280',
      '&:hover': {
        backgroundColor: hasError ? '#fecaca' : '#e5e7eb',
        color: hasError ? '#7f1d1d' : '#374151',
      },
    }),
  };

  return (
    <Select
      isMulti
      value={values}
      onChange={handleChange}
      options={options}
      styles={customStyles}
      className="w-full text-sm"
      placeholder="Select multiple options..."
    />
  );
};
