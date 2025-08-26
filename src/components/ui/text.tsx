import type { ReactNode } from "react";

type Props = {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  className?: string;
  children: ReactNode;
};

export default function Text({
  leftSection,
  rightSection,
  className = "",
  children,
}: Props) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {leftSection && leftSection}
      {children}
      {rightSection && rightSection}
    </div>
  );
}
