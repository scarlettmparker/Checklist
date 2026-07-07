import { configurePageData } from "@sun/ssr";

configurePageData({
  defaultTtlMs: Number(process.env.PAGE_DATA_TTL_MS ?? 300000),
  perPatternTtl: {},
});
