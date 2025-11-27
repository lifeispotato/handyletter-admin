export const NOTIFICATION_KEYS = {
  all: ["notification"] as const,
  list: () => [...NOTIFICATION_KEYS.all, "list"] as const,
  detail: (id: number) => [...NOTIFICATION_KEYS.all, "detail", id] as const,
  create: () => [...NOTIFICATION_KEYS.all, "create"] as const,
  update: (id: number) => [...NOTIFICATION_KEYS.all, "update", id] as const,
  delete: (id: number) => [...NOTIFICATION_KEYS.all, "delete", id] as const,
} as const;
