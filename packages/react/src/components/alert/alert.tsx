import React from "react";
import { cx } from "@explore-ds/core/utils/cx";
import "./alert.scss";

export interface AlertProps {
  variant?: "primary" | "success" | "danger";
  children?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ variant = "primary", children }) => {
  return <div className={cx("alert", `alert-${variant}`)}>{children}</div>;
};
