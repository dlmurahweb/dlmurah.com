import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { env } from "@/lib/env";
import { safePreviewRedirectPath } from "@/lib/preview";
import { secureCompare } from "@/lib/security";

export async function GET(request: NextRequest) {
  const configuredSecret = env.CONTENTFUL_PREVIEW_SECRET;
  const suppliedSecret = request.nextUrl.searchParams.get("secret") ?? "";

  if (!configuredSecret) {
    return NextResponse.json(
      { message: "Preview mode belum dikonfigurasi." },
      { status: 503 },
    );
  }

  if (!secureCompare(suppliedSecret, configuredSecret)) {
    return NextResponse.json(
      { message: "Secret tidak valid." },
      { status: 401 },
    );
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(
    new URL(
      safePreviewRedirectPath(request.nextUrl.searchParams.get("redirect")),
      request.url,
    ),
  );
}
