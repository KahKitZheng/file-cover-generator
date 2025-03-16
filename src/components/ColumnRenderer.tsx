import { FileText, Folder, FolderOpen } from "lucide-react";
import { PDFViewer, Document } from "@react-pdf/renderer";
import { PDFTemplate } from "./PDFTemplate";
import { Column } from "./Column";
import { ColumnItem } from "./ColumnItem";
import { DownloadButton } from "./DownloadButton";
import { COURSE_TYPES } from "../constants/course-types";
import { useFileGeneration } from "../hooks/useFileGeneration";
import {
  downloadAllFiles,
  downloadSubgroupFiles,
  downloadFileTypeFiles,
  downloadScopeFiles,
} from "../utils/downloadWithStructure";

type Selection = {
  subgroup: string | null;
  fileType: string | null;
  scope: FileType | null;
  fileId: string | null;
};

type Focus = {
  column: number;
  index: number;
};

type ColumnRendererProps = {
  column: number;
  courseType: string;
  fileStructure: FileStructure;
  selection: Selection;
  focus: Focus;
  onColumnChange: (column: number, index: number) => void;
  onSelectionChange: (column: number, value: string | FileType) => void;
};

export function ColumnRenderer({
  column,
  courseType,
  fileStructure,
  selection,
  focus,
  onColumnChange,
  onSelectionChange,
}: ColumnRendererProps) {
  const { generateFile } = useFileGeneration();

  let selectedFile: CourseTypeTemplate | undefined;
  let scopes: FileType[] = [];
  let files: FileItem[] = [];

  // Only try to find the selected file if we have both subgroup and file type selected
  if (
    selection.subgroup &&
    selection.fileType &&
    fileStructure[selection.subgroup]
  ) {
    selectedFile = fileStructure[selection.subgroup].find(
      (f: CourseTypeTemplate) => f.name === selection.fileType,
    );
  }

  // Only get scopes if we have a selected file
  if (selectedFile) {
    scopes = ["course-wide", "chapter", "tile"].filter((scope: string) =>
      selectedFile?.files.some((f: FileItem) => f.type === scope),
    ) as FileType[];
  }

  // Only get files if we have all necessary selections
  if (
    selection.subgroup &&
    selection.fileType &&
    selection.scope &&
    fileStructure[selection.subgroup]
  ) {
    const subgroupFiles = fileStructure[selection.subgroup];
    const fileTemplate = subgroupFiles.find(
      (f: CourseTypeTemplate) => f.name === selection.fileType,
    );
    files =
      fileTemplate?.files.filter((f: FileItem) => f.type === selection.scope) ??
      [];
  }

  const selectedFileItem = files.find((f) => f.id === selection.fileId);

  // Download handlers for each column
  const handleDownloadAll = async () => {
    await downloadAllFiles(fileStructure, courseType);
  };

  const handleDownloadSubgroup = async (subgroup: string) => {
    await downloadSubgroupFiles(fileStructure[subgroup], courseType, subgroup);
  };

  const handleDownloadFileType = async (file: CourseTypeTemplate) => {
    await downloadFileTypeFiles(file.files, courseType, file.name);
  };

  const handleDownloadScope = async (scope: FileType) => {
    if (selectedFile) {
      const scopeFiles = selectedFile.files.filter((f) => f.type === scope);
      await downloadScopeFiles(scopeFiles, courseType, scope);
    }
  };

  const handleDownloadFile = async (file: FileItem) => {
    if (selection.fileType) {
      const fileWithType = {
        ...file,
        fileType: selection.fileType,
      };
      await generateFile(fileWithType, courseType, true);
    }
  };

  switch (column) {
    case 0:
      return (
        <Column
          title="Course Type"
          selectedIndex={focus.column === 0 ? focus.index : undefined}
        >
          {COURSE_TYPES.map((type, index) => (
            <ColumnItem
              key={type}
              icon={
                courseType.toLowerCase() === type.toLowerCase()
                  ? FolderOpen
                  : Folder
              }
              label={type}
              isSelected={courseType.toLowerCase() === type.toLowerCase()}
              isFocused={focus.column === 0 && focus.index === index}
              onClick={() => {
                onColumnChange(0, index);
                onSelectionChange(0, type);
              }}
              downloadButton={
                <DownloadButton
                  onClick={async (e) => {
                    e.stopPropagation();
                    await handleDownloadAll();
                  }}
                />
              }
            />
          ))}
        </Column>
      );

    case 1:
      return (
        <Column
          title="File Subgroup"
          selectedIndex={focus.column === 1 ? focus.index : undefined}
        >
          {Object.keys(fileStructure).length === 0 ? (
            <div className="flex items-center justify-center p-4 text-xs text-neutral-400">
              Select a course type
            </div>
          ) : (
            Object.keys(fileStructure).map((subgroup, index) => (
              <ColumnItem
                key={subgroup}
                icon={selection.subgroup === subgroup ? FolderOpen : Folder}
                label={subgroup}
                isSelected={selection.subgroup === subgroup}
                isFocused={focus.column === 1 && focus.index === index}
                onClick={() => {
                  onColumnChange(1, index);
                  onSelectionChange(1, subgroup);
                }}
                downloadButton={
                  <DownloadButton
                    onClick={async (e) => {
                      e.stopPropagation();
                      await handleDownloadSubgroup(subgroup);
                    }}
                  />
                }
              />
            ))
          )}
        </Column>
      );

    case 2:
      return (
        <Column
          title="File Type"
          selectedIndex={focus.column === 2 ? focus.index : undefined}
        >
          {selection.subgroup &&
            fileStructure[selection.subgroup]?.map((file, index) => (
              <ColumnItem
                key={file.name}
                icon={selection.fileType === file.name ? FolderOpen : Folder}
                label={file.name}
                isSelected={selection.fileType === file.name}
                isFocused={focus.column === 2 && focus.index === index}
                onClick={() => {
                  onColumnChange(2, index);
                  onSelectionChange(2, file.name);
                }}
                downloadButton={
                  <DownloadButton
                    onClick={async (e) => {
                      e.stopPropagation();
                      await handleDownloadFileType(file);
                    }}
                  />
                }
              />
            ))}
        </Column>
      );

    case 3:
      return (
        <Column
          title="File Scope"
          selectedIndex={focus.column === 3 ? focus.index : undefined}
        >
          {selectedFile &&
            scopes.map((scope, index) => (
              <ColumnItem
                key={scope}
                icon={selection.scope === scope ? FolderOpen : Folder}
                label={scope}
                isSelected={selection.scope === scope}
                isFocused={focus.column === 3 && focus.index === index}
                onClick={() => {
                  onColumnChange(3, index);
                  onSelectionChange(3, scope);
                }}
                downloadButton={
                  <DownloadButton
                    onClick={async (e) => {
                      e.stopPropagation();
                      await handleDownloadScope(scope);
                    }}
                  />
                }
              />
            ))}
        </Column>
      );

    case 4:
      return (
        <Column
          title="Files"
          selectedIndex={focus.column === 4 ? focus.index : undefined}
        >
          {files.map((file, index) => (
            <ColumnItem
              key={file.id}
              icon={FileText}
              label={`${file.name}${file.order ? ` ${file.order}` : ""}.${file.fileFormat}`}
              isSelected={selection.fileId === file.id}
              isFocused={focus.column === 4 && focus.index === index}
              onClick={() => {
                onColumnChange(4, index);
                onSelectionChange(4, file.id);
              }}
              downloadButton={
                <DownloadButton
                  onClick={async (e) => {
                    e.stopPropagation();
                    await handleDownloadFile(file);
                  }}
                />
              }
            />
          ))}
        </Column>
      );

    case 5:
      return (
        <Column
          title="Preview"
          isLast
          selectedIndex={focus.column === 5 ? focus.index : undefined}
        >
          {selectedFileItem ? (
            <PDFViewer width="100%" height="100%" showToolbar={false}>
              <Document style={{ backgroundColor: "white" }}>
                <PDFTemplate file={selectedFileItem} />
              </Document>
            </PDFViewer>
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-neutral-400">
              Select a file to preview
            </div>
          )}
        </Column>
      );

    default:
      return null;
  }
}
