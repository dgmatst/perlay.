import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
const hostname = window.location.hostname;

if (hostname === "https://www.dgmatst.net") {
  window.location.replace(
    `https://dgmatst.net`
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
