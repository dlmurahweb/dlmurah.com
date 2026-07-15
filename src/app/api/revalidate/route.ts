import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { CONTENTFUL_CACHE_TAG } from "@/contentful/client";
import { env } from "@/lib/env";
import { secureCompare } from "@/lib/security";

export const runtime = "nodejs";

function readSuppliedSecret(request: NextRequest): string {
  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length);
  }

  return request.headers.get("x-contentful-webhook-secret") ?? "";
}

export async function POST(request: NextRequest) {
  const configuredSecret = env.CONTENTFUL_REVALIDATE_SECRET;

  if (!configuredSecret) {
    return NextResponse.json(
      { revalidated: false, message: "Webhook belum dikonfigurasi." },
      { status: 503 },
    );
  }

  if (!secureCompare(readSuppliedSecret(request), configuredSecret)) {
    return NextResponse.json(
      { revalidated: false, message: "Secret tidak valid." },
      { status: 401 },
    );
  }

  revalidateTag(CONTENTFUL_CACHE_TAG, { expire: 0 });
  revalidatePath("/");

  return NextResponse.json({
    revalidated: true,
    timestamp: new Date().toISOString(),
  });
}
