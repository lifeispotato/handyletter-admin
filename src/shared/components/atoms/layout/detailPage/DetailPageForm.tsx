import { cn } from "./../../../../utils/style";
import { ReactNode } from "react";

interface DetailPageFormProps {
  className?: string;
  children: ReactNode;
}

function DetailPageForm({ children, className }: DetailPageFormProps) {
  return (
    <div
      className={cn(
        `
        max-w-[964px]
        flex items-center gap-[20px]
        relative`,
        className
      )}
    >
      {children}
    </div>
  );
}

export default DetailPageForm;
