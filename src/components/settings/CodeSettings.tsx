import { useEffect, useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import { buildCharacterMap, validateSecretCode } from "../../lib/decode";

export default function CodeSettings() {
  const { data, setSecretCode } = useAppData();
  const [draft, setDraft] = useState(data.secretCode);
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    setDraft(data.secretCode);
  }, [data.secretCode]);

  const validation = validateSecretCode(draft);
  const isDirty = draft.trim().toUpperCase() !== data.secretCode.toUpperCase();

  const handleSave = () => {
    if (!validation.valid) return;
    setSecretCode(draft.trim().toUpperCase());
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const mapping = validation.valid ? buildCharacterMap(draft) : buildCharacterMap(data.secretCode);
  const mappingChars = validation.valid ? draft.trim().toUpperCase().split("") : data.secretCode.split("");

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-border bg-surface-raised p-4">
        <label htmlFor="secret-code" className="mb-2 block text-sm font-medium text-ink-soft">
          Secret Code (10 unique characters)
        </label>
        <input
          id="secret-code"
          value={draft}
          onChange={(e) => setDraft(e.target.value.toUpperCase())}
          maxLength={20}
          spellCheck={false}
          autoComplete="off"
          className={`w-full rounded-xl border bg-surface px-4 py-3 text-lg font-semibold tracking-widest text-ink focus:outline-none focus:ring-2 ${
            validation.valid ? "border-border focus:ring-accent/40" : "border-danger focus:ring-danger/40"
          }`}
        />
        {!validation.valid && draft.length > 0 && (
          <p className="mt-2 text-sm font-medium text-danger">{validation.error}</p>
        )}

        <button
          onClick={handleSave}
          disabled={!validation.valid || !isDirty}
          className="mt-4 w-full rounded-xl bg-accent py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
        >
          {savedMessage ? "Saved ✓" : "Save Code"}
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-surface-raised p-4">
        <h2 className="mb-3 text-sm font-medium text-ink-soft">Character → Value Mapping</h2>
        <div className="grid grid-cols-5 gap-2">
          {mappingChars.map((char) => (
            <div
              key={char}
              className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface py-2.5"
            >
              <span className="text-base font-bold text-ink">{char}</span>
              <span className="text-sm font-medium text-accent">{mapping[char]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
