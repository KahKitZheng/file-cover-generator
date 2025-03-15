import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

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

  return (
    <div
      className={`flex cursor-pointer justify-between gap-4 rounded p-2 text-xs ${
        isActive ? "bg-neutral-300 text-neutral-700" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex gap-2">
        <Icon
          size={12}
          strokeWidth={1.5}
          className={`mt-0.5 ${Icon.displayName === "FileText" ? "fill-neutral-50" : "fill-amber-400 stroke-amber-700"}`}
          fill=""
        />
        <p className="font-medium">{label}</p>
      </div>
      {downloadButton}
    </div>
  );
}
