import React from "react";

type ToastContextType = {
  toast: boolean;
  setToast: (toast: boolean) => void;
  text: string;
  setText: (text: string) => void;
}

const ToastContextState = {
  toast: false,
  setToast: (toast: boolean) => {},
  text: "",
  setText: (text: string) => {},
}

const ToastContext = React.createContext<ToastContextType>(ToastContextState)

export default ToastContext