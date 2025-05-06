import React from "react";
import { useThemeContext } from "app/contexts/theme/context";

export const CustomSpinner = ({ size = "3rem" }) => {
  const { cardSkin } = useThemeContext();

  const bgClass =
    cardSkin === "shadow-sm"
      ? "bg-white dark:bg-dark-700"
      : "bg-gray-100 dark:bg-dark-800";

  return (
    <div
      className={`flex flex-col items-center justify-center h-[400px] space-y-4 rounded-md ${bgClass}`}
    >
      <div
        className={`animate-spin rounded-full border-4 border-t-primary-500 border-gray-300`}
        style={{ height: size, width: size }}
      />
      <span className="text-sm text-gray-700 dark:text-dark-200" aria-live="assertive">
        Loading...
      </span>
    </div>
  );
};
