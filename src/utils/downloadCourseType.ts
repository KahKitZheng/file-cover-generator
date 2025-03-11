import JSZip from "jszip";
import { generatePDFContent } from "./generatePDFContent";

export const downloadCourseTypeAsZip = async (
  fileStructure: FileStructure,
  zipName: string,
) => {
  const zip = new JSZip();
  const courseFolder = zip.folder(zipName);

  if (!courseFolder) return;

  for (const [subgroupName, fileSubgroup] of Object.entries(fileStructure)) {
    const subgroupFolder = courseFolder.folder(subgroupName);
    if (!subgroupFolder) continue;

    for (const fileType of fileSubgroup) {
      const fileTypeFolder = subgroupFolder.folder(fileType.name);
      if (!fileTypeFolder) continue;

      for (const file of fileType.files) {
        const type = file.type as FileType;
        const typeFolder = fileTypeFolder.folder(type);
        if (!typeFolder) continue;

        const content = await generatePDFContent(file);
        typeFolder.file(
          `${file.type}${file.order ? ` ${file.order}` : ""}.${file.fileFormat}`,
          content,
        );
      }
    }
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${zipName}.zip`;
  a.click();
  URL.revokeObjectURL(url);
};
