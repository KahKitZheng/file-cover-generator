import { createZipWithFiles } from "../utils/createZip";
import { downloadFile } from "../utils/downloadFile";
import { generatePDFContent } from "../utils/generatePDFContent";

export function useFileGeneration() {
  /**
   * Generates a single file and downloads it
   */
  const generateFile = async (
    file: FileItem,
    courseType: string,
    download: boolean,
  ) => {
    const updatedFile = { ...file };

    // Generate and download the file
    const content = await generatePDFContent(updatedFile);

    if (download) {
      const fileName =
        file.type === "course-wide"
          ? `${courseType}-${file.fileType}-course-wide.pdf`
          : `${courseType}-${file.fileType}-${file.type}-${file.order}.pdf`;
      downloadFile(content, fileName);
    }

    return updatedFile;
  };

  /**
   * Generates multiple files and downloads them as a zip
   */
  const generateFiles = async (filesToGenerate: FileItem[]) => {
    const totalFiles = filesToGenerate.length;
    const generatedFiles: FileItem[] = [];

    // Generate all files
    for (let i = 0; i < totalFiles; i++) {
      const file = filesToGenerate[i];
      const generatedFile = await generateFile(file, "", false);
      generatedFiles.push(generatedFile);
    }

    return generatedFiles;
  };

  /**
   * Downloads multiple files as a zip
   */
  const downloadFilesAsZip = async (files: FileItem[], zipName: string) => {
    if (files.length === 0) return;

    const content = await createZipWithFiles(files);
    downloadFile(content, zipName);
  };

  return {
    generateFile,
    generateFiles,
    downloadFilesAsZip,
  };
}
