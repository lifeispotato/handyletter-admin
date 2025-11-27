export const DIAGNOSIS_KEYS = {
  all: ["diagnosis"] as const,
  list: (memberId: number) =>
    [...DIAGNOSIS_KEYS.all, "list", memberId] as const,
  detail: (diagnosisId: number) =>
    [...DIAGNOSIS_KEYS.all, "detail", diagnosisId] as const,
} as const;
