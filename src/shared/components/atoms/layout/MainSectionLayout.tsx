import { ReactNode } from "react";
import { cn } from "../../../utils/style";

interface MainSectionLayoutProps {
  children: ReactNode;
  className?: string;
}

function MainSectionLayout({ children, className }: MainSectionLayoutProps) {
  return (
    <section className={cn(`w-full max-w-[1044px] pb-[110px]`, className)}>
      {children}
    </section>
  );
}

export default MainSectionLayout;
