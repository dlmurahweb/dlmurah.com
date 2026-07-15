"use client";

import { useEffect } from "react";
import { inject } from "@vercel/analytics";

export function SiteAnalytics() {
  useEffect(() => {
    const hostname = window.location.hostname;
    const isProductionHost =
      hostname === "dlmurah.com" || hostname === "www.dlmurah.com";

    if (!isProductionHost) return;
    inject({ mode: "production", debug: false });
  }, []);

  return null;
}
