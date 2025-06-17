import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./router/routes";
import { LoadingProvider } from "./Context/LoadingContext";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <RouterProvider router={routes} />
    </LoadingProvider>
  </StrictMode>,
);
