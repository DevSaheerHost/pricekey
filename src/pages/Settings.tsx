import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import CodeSettings from "../components/settings/CodeSettings";
import ProductManager from "../components/settings/ProductManager";
import Appearance from "../components/settings/Appearance";
import DataManagement from "../components/settings/DataManagement";

const TABS = [
  { to: "/settings/code", label: "Code" },
  { to: "/settings/products", label: "Products" },
  { to: "/settings/appearance", label: "Appearance" },
  { to: "/settings/data", label: "Data" },
];

export default function Settings() {
  return (
    <div className="flex flex-col gap-5">
      <header className="pt-1">
        <h1 className="text-2xl font-bold text-ink">Settings</h1>
      </header>

      <nav className="flex gap-1 overflow-x-auto rounded-full border border-border bg-surface-raised p-1">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex-1 whitespace-nowrap rounded-full px-3 py-2 text-center text-sm font-medium transition-colors ${
                isActive ? "bg-accent text-white" : "text-ink-soft"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route index element={<Navigate to="code" replace />} />
        <Route path="code" element={<CodeSettings />} />
        <Route path="products" element={<ProductManager />} />
        <Route path="appearance" element={<Appearance />} />
        <Route path="data" element={<DataManagement />} />
      </Routes>
    </div>
  );
}
