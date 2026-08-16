import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StoryProvider } from "./story/StoryContext";
import "./styles/intro.css";
import { CameraProvider } from "./story/CameraContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoryProvider>

     <CameraProvider>

        <App />

     </CameraProvider>

    </StoryProvider>
  </StrictMode>
);