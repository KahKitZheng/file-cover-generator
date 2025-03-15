import { ReactNode } from "react";

type ColumnProps = {
  title: string;
  children: ReactNode;
  isLast?: boolean;
};

export function Column({ title, children, isLast = false }: ColumnProps) {
  return (
    <div
      className={`flex h-full flex-col border-b border-neutral-200 ${!isLast ? "border-r border-neutral-200" : ""}`}
    >
      <p className="border-b border-neutral-200 p-2 px-4 text-xs font-semibold">
        {title}
      </p>
      <div className="m-2 flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
