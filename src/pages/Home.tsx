import { useMemo, useState } from "react";
import { useAppData } from "../context/AppDataContext";
import { decodeProductCode } from "../lib/decode";
import CodeInput from "../components/CodeInput";
import DecodedValue from "../components/DecodedValue";
import ProductCard from "../components/ProductCard";
import ProductSearch from "../components/ProductSearch";

export default function Home() {
  const { data } = useAppData();
  const [code, setCode] = useState("");
  const [search, setSearch] = useState("");

  const decoded = useMemo(() => decodeProductCode(code, data.secretCode), [code, data.secretCode]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return data.products;
    return data.products.filter((p) => p.name.toLowerCase().includes(query));
  }, [data.products, search]);

  return (
    <div className="flex flex-col gap-6">
      <header className="pt-1">
        <h1 className="text-2xl font-bold text-ink">Shop Price Assistant</h1>
      </header>

      <CodeInput value={code} onChange={setCode} error={decoded.error} />

      {decoded.success && decoded.value !== null && (
        <div className="flex flex-col gap-5">
          <DecodedValue value={decoded.value} />

          {data.products.length > 1 && (
            <ProductSearch value={search} onChange={setSearch} />
          )}

          {filteredProducts.length === 0 ? (
            <p className="rounded-2xl border border-border bg-surface-raised px-4 py-6 text-center text-sm text-ink-faint">
              No products match "{search}".
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} codeValue={decoded.value!} />
              ))}
            </div>
          )}
        </div>
      )}

      {!code && (
        <p className="rounded-2xl border border-dashed border-border px-4 py-6 text-center text-sm text-ink-faint">
          Enter a price code above to see pricing for all products.
        </p>
      )}

      {data.products.length === 0 && (
        <p className="rounded-2xl border border-dashed border-border px-4 py-6 text-center text-sm text-ink-faint">
          No products configured yet. Add products in Settings.
        </p>
      )}
    </div>
  );
}
