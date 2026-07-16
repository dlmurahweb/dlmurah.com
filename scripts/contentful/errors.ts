type ContentfulErrorShape = {
  status?: number;
  statusCode?: number;
  response?: { status?: number };
  sys?: { id?: string };
};

function hasNotFoundStatus(candidate: ContentfulErrorShape): boolean {
  return (
    candidate.status === 404 ||
    candidate.statusCode === 404 ||
    candidate.response?.status === 404 ||
    candidate.sys?.id === "NotFound"
  );
}

export function isContentfulNotFound(error: unknown): boolean {
  if (typeof error === "object" && error !== null) {
    const candidate = error as ContentfulErrorShape & { message?: unknown };

    if (hasNotFoundStatus(candidate)) return true;

    if (typeof candidate.message === "string") {
      try {
        const parsed = JSON.parse(candidate.message) as ContentfulErrorShape;
        return hasNotFoundStatus(parsed);
      } catch {
        return false;
      }
    }
  }

  return false;
}
