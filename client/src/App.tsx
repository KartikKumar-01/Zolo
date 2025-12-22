import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "@/pages/Auth";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/auth" element={<Auth />} />

      {/* Chat */}
      <Route path="/chat" element={<Chat />} />

      {/* Default */}
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
}
