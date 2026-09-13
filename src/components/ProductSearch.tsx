interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3-3" strokeLinecap="round" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-full border border-border bg-surface-raised py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/40"
      />
    </div>
  );
}
