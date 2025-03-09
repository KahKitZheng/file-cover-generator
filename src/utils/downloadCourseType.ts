import JSZip from "jszip";
import { generatePDFContent } from "./generatePDFContent";

export const downloadCourseTypeAsZip = async (
  fileStructure: FileStructure,
  zipName: string,
) => {
  const zip = new JSZip();
  const courseFolder = zip.folder(zipName);

  if (!courseFolder) return;

  Object.entries(fileStructure).forEach(([subgroupName, fileSubgroup]) => {
    const subgroupFolder = courseFolder.folder(subgroupName);
    if (!subgroupFolder) return;

    fileSubgroup.forEach((fileType) => {
      const fileTypeFolder = subgroupFolder.folder(fileType.name);
      if (!fileTypeFolder) return;

      fileType.files.forEach((file) => {
        const content = generatePDFContent(file);
        fileTypeFolder.file(`${file.name}.${file.fileFormat}`, content);
      });
    });
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${zipName}.zip`;
  a.click();
  URL.revokeObjectURL(url);
};
