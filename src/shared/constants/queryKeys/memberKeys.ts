export const MEMBER_KEYS = {
  all: ["member"] as const,
  list: () => [...MEMBER_KEYS.all, "list"] as const,
  detail: (id: number) => [...MEMBER_KEYS.all, "detail", id] as const,
  create: () => [...MEMBER_KEYS.all, "create"] as const,
  update: (id: number) => [...MEMBER_KEYS.all, "update", id] as const,
  delete: (id: number) => [...MEMBER_KEYS.all, "delete", id] as const,
} as const;
