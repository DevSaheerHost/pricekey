import { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import type { Product } from "../../types";
import { formatRupees } from "../../lib/pricing";

interface FormState {
  name: string;
  bestExtra: string;
  goodExtra: string;
  maxExtra: string;
}

const EMPTY_FORM: FormState = { name: "", bestExtra: "", goodExtra: "", maxExtra: "" };

function productToForm(product: Product): FormState {
  return {
    name: product.name,
    bestExtra: String(product.bestExtra),
    goodExtra: String(product.goodExtra),
    maxExtra: String(product.maxExtra),
  };
}

export default function ProductManager() {
  const { data, addProduct, updateProduct, deleteProduct } = useAppData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [error, setError] = useState("");

  const startAdd = () => {
    setForm(EMPTY_FORM);
    setError("");
    setIsAdding(true);
    setEditingId(null);
  };

  const startEdit = (product: Product) => {
    setForm(productToForm(product));
    setError("");
    setEditingId(product.id);
    setIsAdding(false);
  };

  const cancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = () => {
    const name = form.name.trim();
    const best = Number(form.bestExtra);
    const good = Number(form.goodExtra);
    const max = Number(form.maxExtra);

    if (!name) return setError("Product name is required.");
    if ([best, good, max].some((n) => Number.isNaN(n) || n < 0)) {
      return setError("Extra amounts must be valid non-negative numbers.");
    }
    if (!(best <= good && good <= max)) {
      return setError("Extras should increase: Best ≤ Good ≤ Max.");
    }

    const payload = { name, bestExtra: best, goodExtra: good, maxExtra: max };

    if (editingId) {
      updateProduct(editingId, payload);
    } else {
      addProduct(payload);
    }
    cancel();
  };

  const isFormOpen = isAdding || editingId !== null;

  return (
    <div className="flex flex-col gap-4">
      {!isFormOpen && (
        <button
          onClick={startAdd}
          className="rounded-xl border border-dashed border-accent/50 bg-accent-soft py-3 text-sm font-semibold text-accent"
        >
          + Add Product
        </button>
      )}

      {isFormOpen && (
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-raised p-4">
          <h2 className="text-sm font-semibold text-ink">{editingId ? "Edit Product" : "New Product"}</h2>

          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Product Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Bluetooth Speaker"
              className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-soft">Best Extra</label>
              <input
                inputMode="decimal"
                value={form.bestExtra}
                onChange={(e) => setForm((f) => ({ ...f, bestExtra: e.target.value }))}
                placeholder="450"
                className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-soft">Good Extra</label>
              <input
                inputMode="decimal"
                value={form.goodExtra}
                onChange={(e) => setForm((f) => ({ ...f, goodExtra: e.target.value }))}
                placeholder="550"
                className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-soft">Max Extra</label>
              <input
                inputMode="decimal"
                value={form.maxExtra}
                onChange={(e) => setForm((f) => ({ ...f, maxExtra: e.target.value }))}
                placeholder="650"
                className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
          </div>

          {error && <p className="text-sm font-medium text-danger">{error}</p>}

          <div className="flex gap-2">
            <button
              onClick={cancel}
              className="flex-1 rounded-xl border border-border py-2.5 text-sm font-semibold text-ink-soft"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 rounded-xl bg-accent py-2.5 text-sm font-semibold text-white"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {data.products.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border px-4 py-6 text-center text-sm text-ink-faint">
            No products yet. Add your first product above.
          </p>
        )}

        {data.products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface-raised p-4"
          >
            <div>
              <p className="font-semibold text-ink">{product.name}</p>
              <p className="text-xs text-ink-faint">
                Best {formatRupees(product.bestExtra)} · Good {formatRupees(product.goodExtra)} · Max{" "}
                {formatRupees(product.maxExtra)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(product)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-ink-soft"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="rounded-lg border border-danger/30 bg-danger-soft px-3 py-1.5 text-xs font-medium text-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
