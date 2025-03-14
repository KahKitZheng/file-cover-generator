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
      className={`flex cursor-pointer items-center justify-between rounded p-2 text-xs ${
        isActive ? "bg-neutral-800 text-neutral-100" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <Icon size={12} strokeWidth={2.5} />
        <span className="font-medium">{label}</span>
      </div>
      {downloadButton}
    </div>
  );
}
