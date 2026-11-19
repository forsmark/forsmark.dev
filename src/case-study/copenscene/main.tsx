import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { CopenScene } from "./CopenScene";
import "../../index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <CopenScene />
    </ErrorBoundary>
  </StrictMode>
);
