import JSZip from "jszip";
import { generatePDFContent } from "./generatePDFContent";

type ZipStructureOptions = {
  includeFileSubgroup?: boolean;
  includeFileType?: boolean;
  includeFileScope?: boolean;
};

/**
 * Creates a zip file with the given files maintaining folder structure
 */
export async function createZipWithFiles(
  files: FileItem[],
  options: ZipStructureOptions = {
    includeFileSubgroup: true,
    includeFileType: true,
    includeFileScope: true,
  },
): Promise<Blob> {
  const zip = new JSZip();

  for (const file of files) {
    const content = await generatePDFContent(file);
    let folder = zip;

    // Add file to appropriate folder based on structure options
    if (options.includeFileSubgroup && file.subgroup) {
      folder = zip.folder(file.subgroup) || zip;
    }

    if (options.includeFileType && file.fileType) {
      folder = folder.folder(file.fileType) || folder;
    }

    if (options.includeFileScope) {
      folder = folder.folder(file.type) || folder;
    }

    folder.file(
      `${file.name}${file.order ? ` ${file.order}` : ""}.${file.fileFormat}`,
      content,
    );
  }

  return zip.generateAsync({ type: "blob" });
}
