import { FileText, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import FileCategory from "./FileCategory";
import Button from "./Button";

type FileTypeProps = {
  fileName: string;
  files: FileItem[];
};

export default function FileType(props: Readonly<FileTypeProps>) {
  const { fileName, files } = props;

  const [isCollapsed, setIsCollapsed] = useState(true);

  const filesByType = Object.groupBy(files, ({ type }) => type);

  function renderFileSection(type: FileType, title: string) {
    if (!filesByType[type]) {
      return;
    }

    const typeAvailable = filesByType[type]?.length > 0;

    return (
      typeAvailable && (
        <FileCategory title={title} type={type} files={filesByType[type]} />
      )
    );
  }

  return (
    <div className="grid gap-2 rounded-lg border border-neutral-200 p-4">
      <div className="flex justify-between">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {/* <input type="checkbox" name="" id="" /> */}
          <FileText size={16} />
          <p className="font-semibold">{fileName}</p>
        </div>
        <div className="mr-4">
          <Button onClick={() => {}}>Download</Button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {renderFileSection("course-wide", "Course-wide")}
          {renderFileSection("chapter", "Chapter-specific")}
          {renderFileSection("tile", "Tile-specific")}
        </>
      )}
    </div>
  );
}
