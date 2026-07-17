const REDACTED = "[REDACTED]";

export function redactSecretValues(message: string): string {
  return message
    .replace(/Bearer\s+[^"\s]+/gi, `Bearer ${REDACTED}`)
    .replace(
      /(["']?(?:accessToken|access_token|token|secret)["']?\s*[:=]\s*["']?)([^"',\s}&]+)/gi,
      `$1${REDACTED}`,
    );
}
