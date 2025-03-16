import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { useTheme } from "../contexts/ThemeContext";

type ColumnItemProps = {
  icon: LucideIcon;
  label: string;
  isSelected: boolean;
  isFocused: boolean;
  onClick: () => void;
  downloadButton?: ReactNode;
};

export function ColumnItem({
  icon: Icon,
  label,
  isSelected,
  isFocused,
  onClick,
  downloadButton,
}: ColumnItemProps) {
  const isActive = isSelected || isFocused;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`focus:ring-opacity-50 flex cursor-pointer justify-between gap-4 rounded p-2 text-xs ring-[var(--theme-focus-ring)] transition-colors focus:ring-2 focus:outline-none ${
        isActive ? "bg-[var(--theme-active)]" : "hover:bg-[var(--theme-hover)]"
      }`}
      onClick={onClick}
      tabIndex={-1}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex gap-2">
        <Icon
          size={12}
          strokeWidth={1.5}
          className={`mt-0.5 ${
            Icon.displayName === "FileText"
              ? isDark
                ? "fill-neutral-700"
                : "fill-neutral-50"
              : "fill-amber-400 stroke-amber-700"
          }`}
          fill=""
        />
        <p className="font-medium">{label}</p>
      </div>
      {downloadButton}
    </div>
  );
}
