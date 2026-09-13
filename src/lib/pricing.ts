import type { CalculatedPrices, Product } from "../types";

export function calculatePrices(codeValue: number, product: Product): CalculatedPrices {
  const best = codeValue + product.bestExtra;
  const good = codeValue + product.goodExtra;
  const max = codeValue + product.maxExtra;
  return {
    codeValue,
    best,
    good,
    max,
    customerSave: max - good,
  };
}

export function formatRupees(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}
