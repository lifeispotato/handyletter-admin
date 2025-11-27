import type { GetInquiryListQueryParams } from "@/api/inquiry/inquiry.types";

export const INQUIRY_KEYS = {
  all: ["inquiries"] as const,
  lists: () => [...INQUIRY_KEYS.all, "list"] as const,
  list: (params: GetInquiryListQueryParams) =>
    [...INQUIRY_KEYS.lists(), params] as const,
  details: () => [...INQUIRY_KEYS.all, "detail"] as const,
  detail: (id: number) => [...INQUIRY_KEYS.details(), id] as const,
};
