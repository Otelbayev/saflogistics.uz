"use client";

import { forwardRef } from "react";
import PhoneInput, {
  type Country,
  type Value,
} from "react-phone-number-input";
import { validatePhoneNumberLength } from "libphonenumber-js";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  defaultCountry?: Country;
  required?: boolean;
  name?: string;
  variant?: "light" | "dark";
  shape?: "block" | "pill";
  className?: string;
};

export const PhoneField = forwardRef<HTMLDivElement, Props>(function PhoneField(
  {
    value,
    onChange,
    placeholder,
    defaultCountry = "UZ",
    required,
    name = "phone",
    variant = "light",
    shape = "block",
    className,
  },
  ref,
) {
  const classes = [
    "phone-field",
    "w-full",
    "min-w-0",
    "text-sm",
    shape === "pill" ? "phone-field--pill" : "",
    variant === "dark" ? "phone-field--dark text-white" : "text-foreground",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  function handleChange(v: string | undefined) {
    const next = (v ?? "") as string;
    if (next && validatePhoneNumberLength(next) === "TOO_LONG") return;
    onChange(next);
  }

  return (
    <div ref={ref} className={classes}>
      <PhoneInput
        international
        withCountryCallingCode
        countryCallingCodeEditable={false}
        defaultCountry={defaultCountry}
        value={value as Value}
        onChange={handleChange}
        placeholder={placeholder}
        name={name}
        required={required}
      />
    </div>
  );
});
