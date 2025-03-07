import { FileText, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import FileCategory from "./FileCategory";
import Button from "./Button";
import JSZip from "jszip";
import { generatePDFContent } from "../utils/generatePDFContent";

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
        <FileCategory
          title={title}
          type={type}
          fileName={fileName}
          files={filesByType[type]}
        />
      )
    );
  }

  const handleDocumentGenerate = async (type: string) => {
    if (files.length === 0) {
      return;
    }

    const zip = new JSZip();
    const categoryFolder = zip.folder(type);

    if (!categoryFolder) {
      return;
    }

    // Group files by type
    const filesByType = files.reduce(
      (acc, file) => {
        if (!acc[file.type]) {
          acc[file.type] = [];
        }
        acc[file.type].push(file);
        return acc;
      },
      {} as Record<FileType, FileItem[]>,
    );

    // Add files to zip maintaining folder structure
    for (const [type, typeFiles] of Object.entries(filesByType)) {
      const typeFolder = categoryFolder.folder(type);
      if (!typeFolder) continue;

      for (const file of typeFiles) {
        const content = generatePDFContent(file);
        typeFolder.file(`${file.name}.${file.fileFormat}`, content);
      }
    }

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-files.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-2 rounded-lg border border-neutral-200 px-4 py-2">
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
          <Button onClick={() => handleDocumentGenerate(fileName)}>
            Download
          </Button>
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
