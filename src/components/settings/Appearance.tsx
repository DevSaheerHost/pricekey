import { useAppData } from "../../context/AppDataContext";
import type { ThemeMode } from "../../types";

const OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export default function Appearance() {
  const { data, setTheme } = useAppData();

  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-4">
      <h2 className="mb-3 text-sm font-medium text-ink-soft">Theme</h2>
      <div className="grid grid-cols-3 gap-2">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={`rounded-xl border py-3 text-sm font-semibold transition-colors ${
              data.theme === option.value
                ? "border-accent bg-accent text-white"
                : "border-border text-ink-soft"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink-faint">
        System follows your device's light/dark setting automatically.
      </p>
    </div>
  );
}
