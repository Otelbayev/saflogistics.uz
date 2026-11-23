"use client";

import { useEffect, useState, type ComponentProps } from "react";
import type { PhoneField as PhoneFieldComponent } from "@/components/ui/PhoneField";

type Props = ComponentProps<typeof PhoneFieldComponent>;

/**
 * PhoneField pulls in react-phone-number-input + libphonenumber metadata
 * (~35 KB gzip). The forms that use it sit far below the fold, so it is split
 * out of the initial bundle and fetched right after hydration. Until then a
 * shell with the same `.phone-field` classes holds the exact same box — no
 * layout shift.
 */
export function LazyPhoneField(props: Props) {
  const [Field, setField] = useState<typeof PhoneFieldComponent | null>(null);

  useEffect(() => {
    let alive = true;
    import("@/components/ui/PhoneField").then((m) => {
      if (alive) setField(() => m.PhoneField);
    });
    return () => {
      alive = false;
    };
  }, []);

  if (Field) return <Field {...props} />;

  const { placeholder, variant = "light", shape = "block", className } = props;
  const classes = [
    "phone-field flex-1 min-w-0 w-full text-sm",
    shape === "pill" ? "phone-field--pill" : "",
    variant === "dark" ? "phone-field--dark text-white" : "text-foreground",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="PhoneInput">
        <input
          className="PhoneInputInput"
          type="tel"
          placeholder={placeholder}
          aria-label={placeholder}
          disabled
        />
      </div>
    </div>
  );
}

/** Validation without pulling libphonenumber into the initial bundle. */
export async function isValidPhone(phone: string): Promise<boolean> {
  if (!phone) return false;
  const { isValidPhoneNumber } = await import("libphonenumber-js");
  return isValidPhoneNumber(phone);
}
