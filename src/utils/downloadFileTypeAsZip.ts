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
  const courseFolder = zip.folder(courseType);
  if (!courseFolder) return;

  // Group files by type
  const filesByType = files.reduce(
    (acc, file) => {
      const type = file.type as FileType;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(file);
      return acc;
    },
    {} as Record<FileType, FileItem[]>,
  );

  // Add files to zip maintaining folder structure
  for (const [type, typeFiles] of Object.entries(filesByType)) {
    const typeFolder = courseFolder.folder(fileType)?.folder(type);
    if (!typeFolder) continue;

    for (const file of typeFiles) {
      const content = await generatePDFContent(file);
      typeFolder.file(
        `${file.type}${file.order ? ` ${file.order}` : ""}.${file.fileFormat}`,
        content,
      );
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
