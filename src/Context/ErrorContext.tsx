import { createContext, useContext, useState, type ReactNode } from "react";

const ErrorContext = createContext({
  error: "",
  setError: (_: string) => {},
  clearError: () => {},
});

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string>("");
  const clearError = () => {
    setError("");
  };
  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
