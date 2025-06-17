import { createContext, useContext, useState, type ReactNode } from "react";

const LoadingContext = createContext({
  loading: false,
  setLoading: (_: boolean) => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
