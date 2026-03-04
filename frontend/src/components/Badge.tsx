import React from "react";
import { classNames } from "../utils/classNames";

export function Badge({
  variant,
  children,
}: {
  variant: "gray" | "blue" | "green" | "amber" | "red";
  children: React.ReactNode;
}) {
  const styles =
    variant === "green"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : variant === "amber"
        ? "bg-amber-50 text-amber-700 ring-amber-200"
        : variant === "red"
          ? "bg-rose-50 text-rose-700 ring-rose-200"
          : variant === "blue"
            ? "bg-sky-50 text-sky-700 ring-sky-200"
            : "bg-slate-100 text-slate-700 ring-slate-200";

  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        styles,
      )}
    >
      {children}
    </span>
  );
}
