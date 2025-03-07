import { useState } from "react";
import { useFileGeneration } from "../hooks/useFileGeneration";
import { FileText, ChevronUp, ChevronDown } from "lucide-react";
import FileCategoryEntry from "./FileCategoryEntry";

type FileCategoryProps = {
  title: string;
  type: FileType;
  files: FileItem[];
};

export default function FileCategory(props: Readonly<FileCategoryProps>) {
  const { title, type, files } = props;
  const { generateFiles, downloadFilesAsZip } = useFileGeneration();

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleBulkGenerateFileCategory = async () => {
    const filesToGenerate = files.filter((f) => f.type === type);
    const generatedFiles = await generateFiles(filesToGenerate);

    await downloadFilesAsZip(generatedFiles, `${title}-files.zip`);
  };

  return (
    <>
      <div className="ml-2 grid gap-2 rounded-lg bg-neutral-100 px-4 py-2">
        <div className="flex justify-between">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {/* <input type="checkbox" name="" id="" /> */}
            <FileText size={16} />
            <p className="text-sm font-medium">{title}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="cursor-pointer rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium"
              onClick={handleBulkGenerateFileCategory}
            >
              Download all
            </button>
            <button
              className="cursor-pointer"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
          </div>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {files.map((file) => (
            <FileCategoryEntry key={file.id} file={file} />
          ))}
        </>
      )}
    </>
  );
}
