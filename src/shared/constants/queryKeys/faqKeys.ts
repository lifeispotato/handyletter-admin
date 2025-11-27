export const FAQ_KEYS = {
  all: ["faq"] as const,
  list: () => [...FAQ_KEYS.all, "list"] as const,
  detail: (id: number) => [...FAQ_KEYS.all, "detail", id] as const,
  create: () => [...FAQ_KEYS.all, "create"] as const,
  update: (id: number) => [...FAQ_KEYS.all, "update", id] as const,
  delete: (id: number) => [...FAQ_KEYS.all, "delete", id] as const,
} as const;
