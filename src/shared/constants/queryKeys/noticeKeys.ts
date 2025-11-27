export const NOTICE_KEYS = {
  all: ["notice"] as const,
  list: () => [...NOTICE_KEYS.all, "list"] as const,
  detail: (id: number) => [...NOTICE_KEYS.all, "detail", id] as const,
  create: () => [...NOTICE_KEYS.all, "create"] as const,
  update: (id: number) => [...NOTICE_KEYS.all, "update", id] as const,
  delete: (id: number) => [...NOTICE_KEYS.all, "delete", id] as const,
} as const;
