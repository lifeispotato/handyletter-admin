export const DORM_KEYS = {
  all: ["dorm"] as const,
  list: () => [...DORM_KEYS.all, "list"] as const,
  detail: (id: number) => [...DORM_KEYS.all, "detail", id] as const,
  create: () => [...DORM_KEYS.all, "create"] as const,
  update: (id: number) => [...DORM_KEYS.all, "update", id] as const,
  delete: (id: number) => [...DORM_KEYS.all, "delete", id] as const,
} as const;

