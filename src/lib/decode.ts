const DIGIT_SEQUENCE = "1234567890";

export interface CodeValidationResult {
  valid: boolean;
  error?: string;
}

export function validateSecretCode(code: string): CodeValidationResult {
  const trimmed = code.trim().toUpperCase();

  if (trimmed.length !== 10) {
    return { valid: false, error: `Code must be exactly 10 characters (got ${trimmed.length}).` };
  }

  const seen = new Set<string>();
  for (const char of trimmed) {
    if (seen.has(char)) {
      return { valid: false, error: `Duplicate character "${char}" is not allowed.` };
    }
    seen.add(char);
  }

  return { valid: true };
}

export function buildCharacterMap(secretCode: string): Record<string, string> {
  const map: Record<string, string> = {};
  const chars = secretCode.trim().toUpperCase().split("");
  chars.forEach((char, index) => {
    map[char] = DIGIT_SEQUENCE[index] ?? "";
  });
  return map;
}

export interface DecodeResult {
  success: boolean;
  value: number | null;
  digits: string;
  error?: string;
}

export function decodeProductCode(input: string, secretCode: string): DecodeResult {
  const cleaned = input.trim().toUpperCase().replace(/\s+/g, "");

  if (!cleaned) {
    return { success: false, value: null, digits: "", error: "" };
  }

  const map = buildCharacterMap(secretCode);
  const invalidChars = new Set<string>();
  let digits = "";

  for (const char of cleaned) {
    const digit = map[char];
    if (digit === undefined) {
      invalidChars.add(char);
    } else {
      digits += digit;
    }
  }

  if (invalidChars.size > 0) {
    const chars = Array.from(invalidChars).join(", ");
    return {
      success: false,
      value: null,
      digits: "",
      error: `Invalid code character${invalidChars.size > 1 ? "s" : ""}: ${chars}`,
    };
  }

  return { success: true, value: Number(digits), digits };
}
