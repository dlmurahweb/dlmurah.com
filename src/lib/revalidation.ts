const BEARER_PREFIX = "Bearer ";

export function readRevalidationSecret(headers: Headers): string {
  const authorization = headers.get("authorization");

  if (authorization?.startsWith(BEARER_PREFIX)) {
    return authorization.slice(BEARER_PREFIX.length);
  }

  return headers.get("x-contentful-webhook-secret") ?? "";
}
