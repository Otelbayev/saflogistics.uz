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
    className,
  },
  ref,
) {
  const base =
    variant === "dark"
      ? "phone-field phone-field--dark phone-field--pill h-12 w-full min-w-0 text-sm text-white"
      : "phone-field phone-field--pill w-full min-w-0 text-sm text-foreground";

  function handleChange(v: string | undefined) {
    const next = (v ?? "") as string;
    if (next && validatePhoneNumberLength(next) === "TOO_LONG") return;
    onChange(next);
  }

  return (
    <div ref={ref} className={`${base} ${className ?? ""}`}>
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
