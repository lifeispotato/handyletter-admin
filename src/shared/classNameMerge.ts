import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const classNameMerge = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export default classNameMerge;
