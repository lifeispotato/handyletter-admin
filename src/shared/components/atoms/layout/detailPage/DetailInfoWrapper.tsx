import { cn } from "./../../../../utils/style";
import { ReactNode } from "react";

interface DetailInfoWrapperProps {
  className?: string;
  children: ReactNode;
}

function DetailInfoWrapper({ children, className }: DetailInfoWrapperProps) {
  return (
    <div className={cn(`flex items-center gap-[20px]`, className)}>
      {children}
    </div>
  );
}

export default DetailInfoWrapper;
