import { ReactNode, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

type ColumnProps = {
  title: string;
  children: ReactNode;
  isLast?: boolean;
  selectedIndex?: number;
};

export function Column({
  title,
  children,
  isLast = false,
  selectedIndex,
}: ColumnProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const isDark = theme === "dark";

  useEffect(() => {
    if (selectedIndex !== undefined && scrollContainerRef.current) {
      const selectedElement = scrollContainerRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div
      className={`flex h-full min-h-0 flex-col border-b ${
        isDark ? "border-neutral-700" : "border-neutral-200"
      } ${!isLast ? "border-r border-neutral-200" : ""}`}
    >
      <p
        className={`flex-none border-b ${
          isDark ? "border-neutral-700" : "border-neutral-200"
        } p-2 px-4 text-xs font-semibold`}
      >
        {title}
      </p>
      <div
        ref={scrollContainerRef}
        className="min-h-0 flex-1 overflow-y-auto p-2"
        style={{
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#e5e5e5 transparent",
        }}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}
