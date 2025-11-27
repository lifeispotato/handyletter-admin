export const MANAGER_KEYS = {
  all: ["manager"] as const,
  list: () => [...MANAGER_KEYS.all, "list"] as const,
  detail: (id: number) => [...MANAGER_KEYS.all, "detail", id] as const,
  myInfo: (userId?: number) => [...MANAGER_KEYS.all, "myInfo", userId] as const,
  update: (id: number) => [...MANAGER_KEYS.all, "update", id] as const,
  delete: (id: number) => [...MANAGER_KEYS.all, "delete", id] as const,
  approval: (id: number) => [...MANAGER_KEYS.all, "approval", id] as const,
} as const;
