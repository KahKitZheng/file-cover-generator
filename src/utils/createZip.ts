import JSZip from "jszip";
import { generatePDFContent } from "./generatePDFContent";

/**
 * Creates a zip file with the given files maintaining folder structure
 */
export async function createZipWithFiles(
  files: FileItem[],
  options: { categoryFolder?: boolean; typeFolder?: boolean } = {
    categoryFolder: true,
    typeFolder: true,
  },
): Promise<Blob> {
  const zip = new JSZip();

  for (const file of files) {
    const content = generatePDFContent(file);
    let folder = zip;

    if (options.categoryFolder) {
      folder = zip.folder(file.type) || zip;
    }

    if (options.typeFolder) {
      folder = folder.folder(file.type) || folder;
    }

    folder.file(`${file.name}.${file.fileFormat}`, content);
  }

  return zip.generateAsync({ type: "blob" });
}
