import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
  text: string;
  onClick: () => void;
  dataTestId?: string;
  style?: React.CSSProperties;
}

export const Button = ({
  text,
  onClick,
  dataTestId,
  style = {},
}: ButtonProps) => (
  <button
    onClick={onClick}
    className={styles.button}
    style={style}
    data-testid={dataTestId}
    role="button"
    aria-label={`${text} button`}
  >
    {text}
  </button>
);
