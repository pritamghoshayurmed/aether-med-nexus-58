import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Load debug tools in development
if (import.meta.env.DEV) {
  import("./utils/locationDebug");
}

createRoot(document.getElementById("root")!).render(<App />);
