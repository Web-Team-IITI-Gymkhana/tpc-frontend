import { Button, Form, Input, Select, message } from "antd";
import { FC, useState } from "react";

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

// Default currencies list
const defaultCurrencies: CurrencyOption[] = [
  { value: "INR", label: "INR", symbol: "₹" },
  { value: "USD", label: "USD", symbol: "$" },
  { value: "EUR", label: "EUR", symbol: "€" },
  { value: "GBP", label: "GBP", symbol: "£" },
  { value: "JPY", label: "JPY", symbol: "¥" },
  { value: "CNY", label: "CNY", symbol: "¥" },
];

interface SalaryField {
  stipendCurrency?: string;
  customCurrencySymbol?: string;
  customCurrencyName?: string;
}

interface CurrencySelectProps {
  name: string[];
  defaultValue?: string;
  style?: React.CSSProperties;
  values?: {
    salaries?: Record<number, SalaryField>;
  };
  setFieldValue?: (field: string, value: any) => void;
  field?: { name: number };
  allowCustom?: boolean;
  maxSymbolLength?: number;
  maxNameLength?: number;
  // Add props for shared custom currencies
  customCurrencies: CurrencyOption[];
  onAddCustomCurrency: (currency: CurrencyOption) => void;
}

const CurrencySelect: FC<CurrencySelectProps> = (props) => {
  const {
    name,
    defaultValue = "INR",
    style = { width: 90 },
    values,
    setFieldValue,
    field,
    allowCustom = false,
    maxSymbolLength = 3,
    maxNameLength = 20,
  } = props;
  // Combine default and custom currencies
  const allCurrencies = [...defaultCurrencies, ...props.customCurrencies];
  const currentSalary = field && values?.salaries?.[field.name];

  const handleCustomCurrencyChange = (
    type: "symbol" | "name",
    value: string,
  ) => {
    if (!setFieldValue || !field || !values?.salaries) return;

    const updatedSalaries = {
      ...values.salaries,
      [field.name]: {
        ...values.salaries[field.name],
        [type === "symbol" ? "customCurrencySymbol" : "customCurrencyName"]:
          value,
      },
    };
    setFieldValue("salaries", updatedSalaries);
  };
  const setCustomCurrency = () => {
    if (
      !setFieldValue ||
      !field ||
      !values?.salaries ||
      !currentSalary?.customCurrencySymbol
    )
      return;

    // Create new currency object
    const newCurrency: CurrencyOption = {
      value: currentSalary.customCurrencySymbol,
      label: currentSalary.customCurrencyName || "Custom",
      symbol: currentSalary.customCurrencySymbol,
    };

    // Check if currency already exists
    const exists = allCurrencies.some(
      (c) => c.value === newCurrency.value || c.symbol === newCurrency.symbol,
    );

    if (exists) {
      message.error("This currency symbol or code already exists");
      return;
    }

    // Add custom currency through the parent callback
    props.onAddCustomCurrency(newCurrency);

    // Update the form value
    const updatedSalaries = {
      ...values.salaries,
      [field.name]: {
        ...values.salaries[field.name],
        stipendCurrency: newCurrency.value,
      },
    };
    setFieldValue("salaries", updatedSalaries);

    message.success(
      `Added new currency: ${newCurrency.symbol} ${newCurrency.label}`,
    );
  };
  const renderOptions = () => {
    return allCurrencies.map((currency) => (
      <Select.Option key={currency.value} value={currency.value}>
        {`${currency.symbol} ${currency.label}`}
      </Select.Option>
    ));
  };

  const renderCustomOption = () => {
    if (!allowCustom) return null;

    const symbol = currentSalary?.customCurrencySymbol;
    const name = currentSalary?.customCurrencyName;

    return (
      <Select.Option value="CUSTOM">
        {symbol ? `${symbol} ${name || "Custom"}` : "Custom"}
      </Select.Option>
    );
  };

  const renderCustomInput = () => {
    if (!allowCustom) return null;

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: 8,
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <Form.Item
          style={{ flex: 1, marginRight: 8, marginBottom: 0 }}
          validateStatus={
            currentSalary?.customCurrencySymbol?.length > maxSymbolLength
              ? "error"
              : undefined
          }
          help={
            currentSalary?.customCurrencySymbol?.length > maxSymbolLength
              ? `Symbol must be ${maxSymbolLength} characters or less`
              : undefined
          }
        >
          <Input
            placeholder="Symbol"
            size="small"
            maxLength={maxSymbolLength}
            value={currentSalary?.customCurrencySymbol || ""}
            onChange={(e) =>
              handleCustomCurrencyChange("symbol", e.target.value)
            }
          />
        </Form.Item>
        <Form.Item
          style={{ flex: 2, marginRight: 8, marginBottom: 0 }}
          validateStatus={
            currentSalary?.customCurrencyName?.length > maxNameLength
              ? "error"
              : undefined
          }
          help={
            currentSalary?.customCurrencyName?.length > maxNameLength
              ? `Name must be ${maxNameLength} characters or less`
              : undefined
          }
        >
          <Input
            placeholder="Currency Name"
            size="small"
            maxLength={maxNameLength}
            value={currentSalary?.customCurrencyName || ""}
            onChange={(e) => handleCustomCurrencyChange("name", e.target.value)}
          />
        </Form.Item>
        <Button
          size="small"
          type="primary"
          disabled={
            !currentSalary?.customCurrencySymbol ||
            currentSalary.customCurrencySymbol.length > maxSymbolLength ||
            (currentSalary.customCurrencyName?.length || 0) > maxNameLength
          }
          onClick={setCustomCurrency}
        >
          Add
        </Button>
      </div>
    );
  };

  return (
    <Form.Item name={name} noStyle initialValue={defaultValue}>
      <Select
        style={style}
        dropdownRender={(menu) =>
          allowCustom ? (
            <>
              {menu}
              {renderCustomInput()}
            </>
          ) : (
            menu
          )
        }
      >
        {renderOptions()}
        {renderCustomOption()}
      </Select>
    </Form.Item>
  );
};

export default CurrencySelect;
