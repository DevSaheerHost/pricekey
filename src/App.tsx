import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <div className="min-h-screen bg-surface text-ink pb-20">
      <main className="mx-auto w-full max-w-2xl px-4 pt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings/*" element={<Settings />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}
