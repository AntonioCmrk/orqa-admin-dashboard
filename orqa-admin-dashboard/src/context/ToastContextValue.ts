import { createContext } from "react";

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error";
}

export interface ToastContextValue {
  showToast: (message: string, type?: ToastMessage["type"]) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
