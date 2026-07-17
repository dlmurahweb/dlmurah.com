export function safePreviewRedirectPath(value: string | null): string {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}
