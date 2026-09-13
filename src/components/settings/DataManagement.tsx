import { useRef, useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import { isValidAppData } from "../../lib/storage";

export default function DataManagement() {
  const { data, replaceAllData, resetAllData } = useAppData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "shop-price-assistant-config.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportFile = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!isValidAppData(parsed)) {
        setMessage({ type: "error", text: "That file doesn't look like a valid configuration." });
        return;
      }
      replaceAllData(parsed);
      setMessage({ type: "success", text: "Configuration imported successfully." });
    } catch {
      setMessage({ type: "error", text: "Could not read that file. Make sure it's valid JSON." });
    }
  };

  const handleReset = () => {
    resetAllData();
    setConfirmingReset(false);
    setMessage({ type: "success", text: "App data has been reset to defaults." });
  };

  return (
    <div className="flex flex-col gap-4">
      {message && (
        <p
          className={`rounded-xl px-4 py-3 text-sm font-medium ${
            message.type === "success" ? "bg-good-soft text-good" : "bg-danger-soft text-danger"
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="rounded-2xl border border-border bg-surface-raised p-4">
        <h2 className="mb-1 text-sm font-semibold text-ink">Export Data</h2>
        <p className="mb-3 text-xs text-ink-faint">Download your code, products and settings as a JSON file.</p>
        <button onClick={handleExport} className="w-full rounded-xl border border-border py-2.5 text-sm font-semibold text-ink">
          Export Data
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-surface-raised p-4">
        <h2 className="mb-1 text-sm font-semibold text-ink">Import Data</h2>
        <p className="mb-3 text-xs text-ink-faint">Restore configuration from a previously exported JSON file.</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImportFile(file);
            e.target.value = "";
          }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full rounded-xl border border-border py-2.5 text-sm font-semibold text-ink"
        >
          Import Data
        </button>
      </div>

      <div className="rounded-2xl border border-danger/30 bg-danger-soft p-4">
        <h2 className="mb-1 text-sm font-semibold text-danger">Reset App</h2>
        <p className="mb-3 text-xs text-danger/80">
          This permanently deletes all local data — code, products and settings — and cannot be undone.
        </p>
        {!confirmingReset ? (
          <button
            onClick={() => setConfirmingReset(true)}
            className="w-full rounded-xl border border-danger/40 py-2.5 text-sm font-semibold text-danger"
          >
            Reset App
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setConfirmingReset(false)}
              className="flex-1 rounded-xl border border-border py-2.5 text-sm font-semibold text-ink-soft"
            >
              Cancel
            </button>
            <button onClick={handleReset} className="flex-1 rounded-xl bg-danger py-2.5 text-sm font-semibold text-white">
              Confirm Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
