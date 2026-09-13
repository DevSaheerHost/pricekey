import type { Product } from "../types";
import { calculatePrices, formatRupees } from "../lib/pricing";
import PriceLevel from "./PriceLevel";

export default function ProductCard({ product, codeValue }: { product: Product; codeValue: number }) {
  const prices = calculatePrices(codeValue, product);

  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-4">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold text-ink">{product.name}</h3>
        <span className="whitespace-nowrap text-xs text-ink-faint">Code {formatRupees(codeValue)}</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <PriceLevel label="BEST" amount={prices.best} />
        <PriceLevel label="GOOD" amount={prices.good} recommended />
        <PriceLevel label="MAX" amount={prices.max} />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
        <p className="text-sm text-ink-soft">
          Recommended: <span className="font-semibold text-ink">{formatRupees(prices.good)}</span>
        </p>
        <p className="text-sm text-good font-medium">Customer saves {formatRupees(prices.customerSave)}</p>
      </div>

      <p className="mt-1 text-xs text-ink-faint">
        {formatRupees(codeValue)} + {formatRupees(product.goodExtra)} = {formatRupees(prices.good)}
      </p>
    </div>
  );
}
