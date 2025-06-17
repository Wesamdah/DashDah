import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./router/routes";
import { LoadingProvider } from "./Context/LoadingContext";
import { ErrorProvider } from "./Context/ErrorContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <ErrorProvider>
        <RouterProvider router={routes} />
      </ErrorProvider>
    </LoadingProvider>
  </StrictMode>,
);
