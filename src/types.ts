export interface Product {
  id: string;
  name: string;
  bestExtra: number;
  goodExtra: number;
  maxExtra: number;
}

export type ThemeMode = "light" | "dark" | "system";

export interface AppData {
  secretCode: string;
  products: Product[];
  theme: ThemeMode;
}

export interface CalculatedPrices {
  codeValue: number;
  best: number;
  good: number;
  max: number;
  customerSave: number;
}
