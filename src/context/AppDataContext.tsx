import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AppData, Product, ThemeMode } from "../types";
import { loadAppData, saveAppData, clearAppData } from "../lib/storage";
import { DEFAULT_APP_DATA } from "../lib/defaultData";

interface AppDataContextValue {
  data: AppData;
  setSecretCode: (code: string) => void;
  setTheme: (theme: ThemeMode) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Omit<Product, "id">) => void;
  deleteProduct: (id: string) => void;
  replaceAllData: (data: AppData) => void;
  resetAllData: () => void;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

function createId(): string {
  return `p_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => loadAppData());

  useEffect(() => {
    saveAppData(data);
  }, [data]);

  useEffect(() => {
    const root = document.documentElement;
    const applySystemTheme = () => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    };

    if (data.theme === "system") {
      applySystemTheme();
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", applySystemTheme);
      return () => mq.removeEventListener("change", applySystemTheme);
    }

    root.classList.toggle("dark", data.theme === "dark");
    return undefined;
  }, [data.theme]);

  const setSecretCode = useCallback((code: string) => {
    setData((prev) => ({ ...prev, secretCode: code }));
  }, []);

  const setTheme = useCallback((theme: ThemeMode) => {
    setData((prev) => ({ ...prev, theme }));
  }, []);

  const addProduct = useCallback((product: Omit<Product, "id">) => {
    setData((prev) => ({
      ...prev,
      products: [...prev.products, { ...product, id: createId() }],
    }));
  }, []);

  const updateProduct = useCallback((id: string, product: Omit<Product, "id">) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...product, id } : p)),
    }));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  }, []);

  const replaceAllData = useCallback((next: AppData) => {
    setData(next);
  }, []);

  const resetAllData = useCallback(() => {
    clearAppData();
    setData(DEFAULT_APP_DATA);
  }, []);

  const value = useMemo<AppDataContextValue>(
    () => ({
      data,
      setSecretCode,
      setTheme,
      addProduct,
      updateProduct,
      deleteProduct,
      replaceAllData,
      resetAllData,
    }),
    [data, setSecretCode, setTheme, addProduct, updateProduct, deleteProduct, replaceAllData, resetAllData],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData(): AppDataContextValue {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
