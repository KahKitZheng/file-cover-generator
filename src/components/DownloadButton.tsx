import { Download } from "lucide-react";

type DownloadButtonProps = {
  onClick: (e: React.MouseEvent) => void;
};

export function DownloadButton({ onClick }: DownloadButtonProps) {
  return (
    <button
      className={`focus:ring-opacity-50 -mt-0.5 h-fit cursor-pointer rounded p-1 opacity-25 ring-[var(--theme-focus-ring)] transition-all hover:bg-[var(--theme-accent)] hover:opacity-100 focus:ring-2 focus:outline-none`}
      onClick={onClick}
      tabIndex={-1}
    >
      <Download size={12} strokeWidth={2.5} />
    </button>
  );
}
