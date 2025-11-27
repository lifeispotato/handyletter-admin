import { atom } from "recoil";

/**
 * Holds the ID of the inquiry to show in the detail modal.
 * null = modal is closed.
 * number = modal is open for that ID.
 */
export const inquiryDetailModalState = atom<number | null>({
  key: "inquiryDetailModalState",
  default: null,
});
