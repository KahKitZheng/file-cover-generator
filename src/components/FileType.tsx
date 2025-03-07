import { FileText, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import FileCategory from "./FileCategory";

type FileTypeProps = {
  fileName: string;
  files: FileItem[];
};

export default function FileType(props: Readonly<FileTypeProps>) {
  const { fileName, files } = props;

  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <div className="grid gap-2 rounded-lg border border-neutral-200 px-2 py-4">
      <div className="flex justify-between">
        <div
          className="ml-2 flex cursor-pointer items-center gap-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {/* <input type="checkbox" name="" id="" /> */}
          <FileText size={16} />
          <p className="font-semibold">{fileName}</p>
        </div>
        <div className="mr-4 flex items-center gap-2">
          <button className="cursor-pointer rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium hover:bg-neutral-100">
            Download all
          </button>
          <button
            className="cursor-pointer"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
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
