import { FileText } from "lucide-react";
import Button from "./Button";
import { useFileGeneration } from "../hooks/useFileGeneration";

type FileCategoryEntryProps = {
  file: FileItem;
};

export default function FileCategoryEntry(
  props: Readonly<FileCategoryEntryProps>,
) {
  const { file } = props;

  const { generateFile } = useFileGeneration();

  return (
    <div className="ml-8 flex justify-between rounded-lg border border-neutral-200 bg-white px-4 py-2 hover:bg-neutral-100">
      <div className="flex items-center gap-2">
        {/* <input type="checkbox" name="" id="" /> */}
        <FileText size={16} />
        <p className="text-sm font-medium">{file.name}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => generateFile(file, true)}>Download</Button>
      </div>
    </div>
  );
}
