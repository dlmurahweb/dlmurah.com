import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { CONTENTFUL_CACHE_TAG } from "@/contentful/client";
import { env } from "@/lib/env";
import { readRevalidationSecret } from "@/lib/revalidation";
import { secureCompare } from "@/lib/security";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const configuredSecret = env.CONTENTFUL_REVALIDATE_SECRET;

  if (!configuredSecret) {
    return NextResponse.json(
      { revalidated: false, message: "Webhook belum dikonfigurasi." },
      { status: 503 },
    );
  }

  if (
    !secureCompare(readRevalidationSecret(request.headers), configuredSecret)
  ) {
    return NextResponse.json(
      { revalidated: false, message: "Secret tidak valid." },
      { status: 401 },
    );
  }

  revalidateTag(CONTENTFUL_CACHE_TAG, { expire: 0 });
  revalidatePath("/");

  return NextResponse.json({
    revalidated: true,
    tag: CONTENTFUL_CACHE_TAG,
    paths: ["/"],
    timestamp: new Date().toISOString(),
  });
}
