import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "@/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";
import ConversationProvider from "./context/ConversationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <ConversationProvider>
        <BrowserRouter>
          <Toaster position="top-right" richColors />
          <App />
        </BrowserRouter>
      </ConversationProvider>
    </UserProvider>
  </StrictMode>
);
