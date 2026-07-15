import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { env } from "@/lib/env";
import { secureCompare } from "@/lib/security";

function safeRedirectPath(value: string | null): string {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}

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
      safeRedirectPath(request.nextUrl.searchParams.get("redirect")),
      request.url,
    ),
  );
}
