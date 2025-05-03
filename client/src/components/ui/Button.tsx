import React, { ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  let variantClasses: string;

  switch (variant) {
    case "secondary":
      variantClasses =
        "bg-gray-600 hover:bg-gray-700 focus:ring-gray-300 text-white";
      break;
    case "danger":
      variantClasses =
        "bg-red-600 hover:bg-red-700 focus:ring-red-300 text-white";
      break;
    case "success":
      variantClasses =
        "bg-green-600 hover:bg-green-700 focus:ring-green-300 text-white";
      break;
    case "outline":
      variantClasses =
        "bg-white border border-gray-300 hover:bg-gray-50 focus:ring-blue-300 text-gray-700";
      break;
    case "primary":
    default:
      variantClasses =
        "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 text-white";
  }

  let sizeClasses: string;
  switch (size) {
    case "sm":
      sizeClasses = "text-xs py-1.5 px-3";
      break;
    case "lg":
      sizeClasses = "text-base py-3 px-6";
      break;
    case "md":
    default:
      sizeClasses = "text-sm py-2 px-4";
  }

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass =
    disabled || isLoading ? "opacity-70 cursor-not-allowed" : "";

  return (
    <button
      className={`
        ${variantClasses} 
        ${sizeClasses} 
        ${widthClass} 
        ${disabledClass} 
        ${className}
        rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-colors duration-200 flex items-center justify-center
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2">
          <Spinner size="sm" color="white" />
        </span>
      ) : iconLeft ? (
        <span className="mr-2">{iconLeft}</span>
      ) : null}

      {children}

      {!isLoading && iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};

export default Button;
