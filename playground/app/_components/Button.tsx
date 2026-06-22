import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

// The first real Grund component. Variants (primary / ghost) are the only
// styled axis for now; everything visual comes from the --gds-button-* tokens
// via Button.module.css. forwardRef so triggers (e.g. the options popover) can
// measure and anchor to it.
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", leadingIcon, trailingIcon, children, className, type = "button", ...rest },
  ref
) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");
  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
});
