import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StoryProvider } from "./story/StoryContext";
import "./styles/intro.css";
import { CameraProvider } from "./story/CameraContext";
import { PostHogProvider } from "@posthog/react";

const posthogApiKey =
  import.meta.env.VITE_POSTHOG_PROJECT_TOKEN ||
  "phc_pLTos9ws4shUwkmC9TqooGxwyBikLNfy7SBZhAnSdjvt";

const posthogOptions = {
  api_host:
    import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
  person_profiles: "identified_only",
  capture_pageview: true,
  autocapture: true,
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PostHogProvider apiKey={posthogApiKey} options={posthogOptions}>
      <StoryProvider>
        <CameraProvider>
          <App />
        </CameraProvider>
      </StoryProvider>
    </PostHogProvider>
  </StrictMode>
);