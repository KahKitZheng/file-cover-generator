import { Download } from "lucide-react";

type DownloadButtonProps = {
  onClick: (e: React.MouseEvent) => void;
};

export function DownloadButton({ onClick }: DownloadButtonProps) {
  return (
    <button
      className="cursor-pointer rounded p-1 hover:bg-neutral-700 hover:text-neutral-100"
      onClick={onClick}
    >
      <Download size={12} strokeWidth={2.5} />
    </button>
  );
}
