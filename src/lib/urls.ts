export function sanitizePublicUrl(value: string): string | null {
  const candidate = value.trim();

  if (candidate.startsWith("#")) return candidate;
  if (candidate.startsWith("/") && !candidate.startsWith("//")) {
    return candidate;
  }

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function isExternalUrl(value: string): boolean {
  return value.startsWith("https://");
}
