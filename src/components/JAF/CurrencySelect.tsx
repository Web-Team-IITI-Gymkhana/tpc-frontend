import { Button, Form, Input, Select, message } from "antd";
import { FC, useState } from "react";

interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

const defaultCurrencies: CurrencyOption[] = [
  { value: "INR", label: "INR", symbol: "₹" },
  { value: "USD", label: "USD", symbol: "$" },
  { value: "EUR", label: "EUR", symbol: "€" },
  { value: "GBP", label: "GBP", symbol: "£" },
  { value: "JPY", label: "JPY", symbol: "¥" },
  { value: "CNY", label: "CNY", symbol: "¥" },
];

interface CurrencySelectProps {
  defaultValue?: string;
  style?: React.CSSProperties;
  allowCustom?: boolean;
  maxSymbolLength?: number;
  maxNameLength?: number;
  customCurrencies: CurrencyOption[];
  onAddCustomCurrency: (currency: CurrencyOption) => void;
  syncedCurrency?: string;
  onCurrencySync?: (currency: string) => void;
}

const CurrencySelect: FC<CurrencySelectProps> = (props) => {
  const {
    defaultValue = "INR",
    style = { width: 90 },
    allowCustom = false,
    maxSymbolLength = 3,
    maxNameLength = 20,
  } = props;
  const allCurrencies = [...defaultCurrencies, ...props.customCurrencies];
  const [customSymbol, setCustomSymbol] = useState("");
  const [customName, setCustomName] = useState("");

  const handleCustomCurrencyChange = (
    type: "symbol" | "name",
    value: string,
  ) => {
    if (type === "symbol") {
      setCustomSymbol(value);
    } else {
      setCustomName(value);
    }
  };

  const setCustomCurrency = () => {
    if (!customSymbol) return;

    const newCurrency: CurrencyOption = {
      value: customSymbol,
      label: customName || "Custom",
      symbol: customSymbol,
    };

    const exists = allCurrencies.some(
      (c) => c.value === newCurrency.value || c.symbol === newCurrency.symbol,
    );

    if (exists) {
      message.error("This currency symbol or code already exists");
      return;
    }

    props.onAddCustomCurrency(newCurrency);

    // Set the new currency as the selected currency
    if (props.onCurrencySync) {
      props.onCurrencySync(newCurrency.value);
    }

    // Reset custom inputs
    setCustomSymbol("");
    setCustomName("");

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

    return (
      <Select.Option value="CUSTOM">
        {customSymbol ? `${customSymbol} ${customName || "Custom"}` : "Custom"}
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
            customSymbol.length > maxSymbolLength ? "error" : undefined
          }
          help={
            customSymbol.length > maxSymbolLength
              ? `Symbol must be ${maxSymbolLength} characters or less`
              : undefined
          }
        >
          <Input
            placeholder="Symbol"
            size="small"
            maxLength={maxSymbolLength}
            value={customSymbol}
            onChange={(e) =>
              handleCustomCurrencyChange("symbol", e.target.value)
            }
          />
        </Form.Item>
        <Form.Item
          style={{ flex: 2, marginRight: 8, marginBottom: 0 }}
          validateStatus={
            customName.length > maxNameLength ? "error" : undefined
          }
          help={
            customName.length > maxNameLength
              ? `Name must be ${maxNameLength} characters or less`
              : undefined
          }
        >
          <Input
            placeholder="Currency Name"
            size="small"
            maxLength={maxNameLength}
            value={customName}
            onChange={(e) => handleCustomCurrencyChange("name", e.target.value)}
          />
        </Form.Item>
        <Button
          size="small"
          type="primary"
          disabled={
            !customSymbol ||
            customSymbol.length > maxSymbolLength ||
            customName.length > maxNameLength
          }
          onClick={setCustomCurrency}
        >
          Add
        </Button>
      </div>
    );
  };

  const handleChange = (value: string) => {
    if (props.onCurrencySync) {
      props.onCurrencySync(value);
    }
  };

  return (
    <Select
      style={style}
      value={props.syncedCurrency || defaultValue}
      onChange={handleChange}
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
  );
};

export default CurrencySelect;
