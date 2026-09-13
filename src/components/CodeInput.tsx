import { useEffect, useRef } from "react";

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function CodeInput({ value, onChange, error }: CodeInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <label htmlFor="code-input" className="mb-2 block text-sm font-medium text-ink-soft">
        Enter Code
      </label>
      <input
        id="code-input"
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        placeholder="e.g. WKE"
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        className={`w-full rounded-2xl border bg-surface-raised px-5 py-4 text-2xl font-semibold tracking-widest text-ink placeholder:text-ink-faint placeholder:font-normal placeholder:tracking-normal focus:outline-none focus:ring-2 ${
          error ? "border-danger focus:ring-danger/40" : "border-border focus:ring-accent/40"
        }`}
      />
      {error && <p className="mt-2 text-sm font-medium text-danger">{error}</p>}
    </div>
  );
}
