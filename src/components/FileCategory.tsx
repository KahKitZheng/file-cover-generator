import { useState } from "react";
import { useFileGeneration } from "../hooks/useFileGeneration";
import { FileText, ChevronUp, ChevronDown } from "lucide-react";
import FileCategoryEntry from "./FileCategoryEntry";
import Button from "./Button";

type FileCategoryProps = {
  title: string;
  type: FileType;
  fileName: string;
  files: FileItem[];
};

export default function FileCategory(props: Readonly<FileCategoryProps>) {
  const { title, type, fileName, files } = props;
  const { generateFiles, downloadFilesAsZip } = useFileGeneration();

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleBulkGenerateFileCategory = async () => {
    const filesToGenerate = files.filter((f) => f.type === type);
    const generatedFiles = await generateFiles(filesToGenerate);

    await downloadFilesAsZip(generatedFiles, `${fileName}-${type}.zip`);
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
            {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            <FileText size={16} />
            <p className="text-sm font-medium">{`${title} (${files.length})`}</p>
          </div>
          <Button onClick={handleBulkGenerateFileCategory}>Download</Button>
        </div>
      </div>

      {!isCollapsed &&
        files.map((file) => <FileCategoryEntry key={file.id} file={file} />)}
    </>
  );
}
