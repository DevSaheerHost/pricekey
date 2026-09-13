import { formatRupees } from "../lib/pricing";

interface PriceLevelProps {
  label: "BEST" | "GOOD" | "MAX";
  amount: number;
  recommended?: boolean;
}

const STYLES: Record<PriceLevelProps["label"], { chip: string; text: string }> = {
  BEST: { chip: "bg-best-soft text-best", text: "text-ink" },
  GOOD: { chip: "bg-good-soft text-good", text: "text-ink" },
  MAX: { chip: "bg-max-soft text-max", text: "text-ink" },
};

export default function PriceLevel({ label, amount, recommended }: PriceLevelProps) {
  const style = STYLES[label];
  return (
    <div
      className={`flex flex-col items-center gap-1.5 rounded-xl2 border px-2 py-3 text-center ${
        recommended ? "border-good bg-good-soft/40" : "border-border"
      }`}
    >
      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide ${style.chip}`}>{label}</span>
      <span className="text-lg font-bold text-ink">{formatRupees(amount)}</span>
    </div>
  );
}
