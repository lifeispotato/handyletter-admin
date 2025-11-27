export const TODAY_BRAND_KEYS = {
  all: ["todayBrand"] as const,
  list: () => [...TODAY_BRAND_KEYS.all, "list"] as const,
  detail: (id: number) => [...TODAY_BRAND_KEYS.all, "detail", id] as const,
  create: () => [...TODAY_BRAND_KEYS.all, "create"] as const,
  update: (id: number) => [...TODAY_BRAND_KEYS.all, "update", id] as const,
  delete: (id: number) => [...TODAY_BRAND_KEYS.all, "delete", id] as const,
} as const;
