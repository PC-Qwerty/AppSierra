import React from "react";
import { AlertCircle, CheckCircle, XCircle, Info } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  type: AlertType;
  message: string;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ type, message, className = "" }) => {
  let bgColor, textColor, borderColor, Icon;

  switch (type) {
    case "success":
      bgColor = "bg-green-50";
      textColor = "text-green-800";
      borderColor = "border-green-400";
      Icon = CheckCircle;
      break;
    case "error":
      bgColor = "bg-red-50";
      textColor = "text-red-800";
      borderColor = "border-red-400";
      Icon = XCircle;
      break;
    case "warning":
      bgColor = "bg-yellow-50";
      textColor = "text-yellow-800";
      borderColor = "border-yellow-400";
      Icon = AlertCircle;
      break;
    case "info":
    default:
      bgColor = "bg-blue-50";
      textColor = "text-blue-800";
      borderColor = "border-blue-400";
      Icon = Info;
  }

  return (
    <div
      className={`flex items-center p-4 mb-4 ${bgColor} ${textColor} border-l-4 ${borderColor} rounded-md ${className}`}
    >
      <Icon className="w-5 h-5 mr-2 flex-shrink-0" />
      <div className="ml-1 text-sm font-medium">{message}</div>
    </div>
  );
};

export default Alert;
