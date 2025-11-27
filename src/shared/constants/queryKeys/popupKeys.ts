export const POPUP_KEYS = {
  all: ["popup"] as const,
  list: () => [...POPUP_KEYS.all, "list"] as const,
  detail: (id: number) => [...POPUP_KEYS.all, "detail", id] as const,
  create: () => [...POPUP_KEYS.all, "create"] as const,
  update: (id: number) => [...POPUP_KEYS.all, "update", id] as const,
  delete: (id: number) => [...POPUP_KEYS.all, "delete", id] as const,
} as const;
