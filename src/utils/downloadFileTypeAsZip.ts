import JSZip from "jszip";
import { generatePDFContent } from "./generatePDFContent";

export const downloadFileTypeAsZip = async (
  courseType: string,
  fileType: string,
  files: FileItem[],
) => {
  if (files.length === 0) {
    return;
  }

  const zip = new JSZip();

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
    const typeFolder = zip.folder(type);
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
  a.download = `${courseType}-${fileType}.zip`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
