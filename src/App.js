import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}
