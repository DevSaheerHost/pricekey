import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { AppDataProvider } from "./context/AppDataContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppDataProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AppDataProvider>
  </StrictMode>,
);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Offline caching is a progressive enhancement — ignore registration failures.
    });
  });
}
