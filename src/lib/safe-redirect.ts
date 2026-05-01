export function getSafeRedirectPath(value: string | null | undefined): string {
  const normalizedValue = value?.trim();

  if (
    !normalizedValue ||
    !normalizedValue.startsWith("/") ||
    normalizedValue.startsWith("//") ||
    normalizedValue.includes("\\")
  ) {
    return "/";
  }

  try {
    const url = new URL(normalizedValue, "http://localhost");
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}
