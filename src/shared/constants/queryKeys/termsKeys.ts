export const TERMS_KEYS = {
  all: ["terms"] as const,
  list: () => [...TERMS_KEYS.all, "list"] as const,
  detail: (id: number) => [...TERMS_KEYS.all, "detail", id] as const,
  create: () => [...TERMS_KEYS.all, "create"] as const,
  update: (id: number) => [...TERMS_KEYS.all, "update", id] as const,
  delete: (id: number) => [...TERMS_KEYS.all, "delete", id] as const,
} as const;
