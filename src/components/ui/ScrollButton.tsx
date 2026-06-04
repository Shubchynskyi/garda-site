import type { ReactNode } from "react";
import { scrollToSection } from "../../lib/scroll";

export function ScrollButton({
  targetId,
  className,
  children,
}: {
  targetId: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={() => scrollToSection(targetId)} className={className}>
      {children}
    </button>
  );
}
