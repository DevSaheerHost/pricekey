import type { AppData } from "../types";
import { DEFAULT_APP_DATA } from "./defaultData";

const STORAGE_KEY = "shop-price-assistant:data";

export function isValidAppData(value: unknown): value is AppData {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  return (
    typeof data.secretCode === "string" &&
    Array.isArray(data.products) &&
    (data.theme === "light" || data.theme === "dark" || data.theme === "system")
  );
}

export function loadAppData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_APP_DATA;
    const parsed = JSON.parse(raw);
    if (!isValidAppData(parsed)) return DEFAULT_APP_DATA;
    return parsed;
  } catch {
    return DEFAULT_APP_DATA;
  }
}

export function saveAppData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable (private mode, quota) — fail silently, in-memory state still works.
  }
}

export function clearAppData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
