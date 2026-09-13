import { formatRupees } from "../lib/pricing";

export default function DecodedValue({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-accent-soft px-5 py-4">
      <span className="text-sm font-medium text-ink-soft">Decoded Value</span>
      <span className="text-2xl font-bold text-accent">{formatRupees(value)}</span>
    </div>
  );
}
