import { Download } from "lucide-react";

type DownloadButtonProps = {
  onClick: (e: React.MouseEvent) => void;
};

export function DownloadButton({ onClick }: DownloadButtonProps) {
  return (
    <button
      className="-mt-0.5 h-fit cursor-pointer rounded p-1 opacity-25 hover:bg-neutral-500 hover:text-neutral-100 hover:opacity-100"
      onClick={onClick}
      tabIndex={-1}
    >
      <Download size={12} strokeWidth={2.5} />
    </button>
  );
}
