import { createZipWithFiles } from "./createZip";
import { downloadFile } from "./downloadFile";

type DownloadStructure = {
  includeFileSubgroup: boolean;
  includeFileType: boolean;
  includeFileScope: boolean;
};

/**
 * Downloads files with the specified folder structure
 */
export async function downloadWithStructure(
  files: FileItem[],
  courseType: string,
  structure: DownloadStructure,
  namePrefix: string,
) {
  const content = await createZipWithFiles(files, structure);
  const isCourseWide = files.every((f) => f.type === "course-wide");
  const suffix = isCourseWide ? "-complete" : "";
  downloadFile(content, `${courseType}-${namePrefix}${suffix}.zip`);
}

/**
 * Downloads files from the first column (all files)
 */
export async function downloadAllFiles(
  fileStructure: FileStructure,
  courseType: string,
) {
  const allFiles = Object.entries(fileStructure).flatMap(([subgroup, files]) =>
    files.flatMap((file) =>
      file.files.map((f) => ({
        ...f,
        subgroup,
        fileType: file.name,
      })),
    ),
  );

  await downloadWithStructure(
    allFiles,
    courseType,
    {
      includeFileSubgroup: true,
      includeFileType: true,
      includeFileScope: true,
    },
    "complete",
  );
}

/**
 * Downloads files from the second column (file subgroup)
 */
export async function downloadSubgroupFiles(
  files: CourseTypeTemplate[],
  courseType: string,
  subgroup: string,
) {
  const subgroupFiles = files.flatMap((file) =>
    file.files.map((f) => ({
      ...f,
      fileType: file.name,
    })),
  );

  await downloadWithStructure(
    subgroupFiles,
    courseType,
    {
      includeFileSubgroup: false,
      includeFileType: true,
      includeFileScope: true,
    },
    subgroup,
  );
}

/**
 * Downloads files from the third column (file type)
 */
export async function downloadFileTypeFiles(
  files: FileItem[],
  courseType: string,
  fileType: string,
) {
  const fileTypeFiles = files.map((f) => ({
    ...f,
    fileType,
  }));

  await downloadWithStructure(
    fileTypeFiles,
    courseType,
    {
      includeFileSubgroup: false,
      includeFileType: false,
      includeFileScope: true,
    },
    fileType,
  );
}

/**
 * Downloads files from the fourth column (file scope)
 */
export async function downloadScopeFiles(
  files: FileItem[],
  courseType: string,
  scope: string,
) {
  const scopeFiles = files.filter((f) => f.type === scope);

  await downloadWithStructure(
    scopeFiles,
    courseType,
    {
      includeFileSubgroup: false,
      includeFileType: false,
      includeFileScope: false,
    },
    scope,
  );
}
