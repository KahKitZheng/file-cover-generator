import { useState, useEffect, useCallback } from "react";
import { FileText, Folder } from "lucide-react";
import { downloadFileTypeAsZip } from "../utils/downloadFileTypeAsZip";
import { COURSE_TYPES } from "../constants/course-types";
import { PDFViewer, Document } from "@react-pdf/renderer";
import { PDFTemplate } from "./PDFTemplate";
import { useFileGeneration } from "../hooks/useFileGeneration";
import { Column } from "./Column";
import { ColumnItem } from "./ColumnItem";
import { DownloadButton } from "./DownloadButton";

type ColumnLayoutProps = {
  courseType: string;
  fileStructure: FileStructure;
  onCourseTypeChange: (courseType: string) => void;
};

export default function ColumnLayout({
  courseType,
  fileStructure,
  onCourseTypeChange,
}: Readonly<ColumnLayoutProps>) {
  const [selectedSubgroup, setSelectedSubgroup] = useState<string | null>(null);
  const [selectedFileType, setSelectedFileType] = useState<string | null>(null);
  const [selectedScope, setSelectedScope] = useState<FileType | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [focusedColumn, setFocusedColumn] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(() => {
    const index = COURSE_TYPES.findIndex(
      (type) => type.toLowerCase() === courseType.toLowerCase(),
    );
    return index >= 0 ? index : 0;
  });

  const { generateFile } = useFileGeneration();

  const getColumnItems = useCallback(
    (column: number) => {
      let items: (string | FileType)[] = [];
      let selectedFile: CourseTypeTemplate | undefined;

      switch (column) {
        case 0:
          items = COURSE_TYPES;
          break;
        case 1:
          items = Object.keys(fileStructure);
          break;
        case 2:
          if (selectedSubgroup) {
            items = fileStructure[selectedSubgroup].map(
              (f: CourseTypeTemplate) => f.name,
            );
          }
          break;
        case 3:
          if (selectedSubgroup && selectedFileType) {
            selectedFile = fileStructure[selectedSubgroup].find(
              (f: CourseTypeTemplate) => f.name === selectedFileType,
            );
            if (selectedFile) {
              items = ["course-wide", "chapter", "tile"].filter(
                (scope: string) =>
                  selectedFile?.files.some((f: FileItem) => f.type === scope),
              );
            }
          }
          break;
        case 4:
          if (selectedSubgroup && selectedFileType && selectedScope) {
            selectedFile = fileStructure[selectedSubgroup].find(
              (f: CourseTypeTemplate) => f.name === selectedFileType,
            );
            if (selectedFile) {
              items = selectedFile.files
                .filter((f: FileItem) => f.type === selectedScope)
                .map((f: FileItem) => f.id);
            }
          }
          break;
      }

      return items;
    },
    [fileStructure, selectedSubgroup, selectedFileType, selectedScope],
  );

  const handleColumnChange = useCallback(
    (newColumn: number) => {
      setFocusedColumn(newColumn);
      const items = getColumnItems(newColumn);
      const maxIndex = items.length - 1;

      // When moving back, use the previous index if it exists in the new column
      let newIndex: number;
      if (newColumn < focusedColumn) {
        // Get the previously selected item in the new column
        const previousSelectedItem = (() => {
          switch (newColumn) {
            case 0:
              return courseType;
            case 1:
              return selectedSubgroup;
            case 2:
              return selectedFileType;
            case 3:
              return selectedScope;
            case 4:
              return selectedFileId;
            default:
              return undefined;
          }
        })();

        // Find the index of the previously selected item
        const previousIndex = items.findIndex(
          (item) => item === previousSelectedItem,
        );
        newIndex = previousIndex >= 0 ? previousIndex : 0;
      } else {
        // When moving forward, use the current focused index
        newIndex = Math.min(focusedIndex, maxIndex);
      }

      setFocusedIndex(newIndex);

      // Reset next column's selection when moving back
      if (newColumn < focusedColumn) {
        switch (focusedColumn) {
          case 1:
            setSelectedSubgroup(null);
            break;
          case 2:
            setSelectedFileType(null);
            break;
          case 3:
            setSelectedScope(null);
            break;
          case 4:
            setSelectedFileId(null);
            break;
        }
      }

      // Select the focused item when changing columns
      const selectedItem = items[newIndex];
      if (selectedItem) {
        switch (newColumn) {
          case 0:
            onCourseTypeChange(selectedItem as string);
            break;
          case 1:
            setSelectedSubgroup(selectedItem as string);
            break;
          case 2:
            setSelectedFileType(selectedItem as string);
            break;
          case 3:
            setSelectedScope(selectedItem as FileType);
            break;
          case 4:
            setSelectedFileId(selectedItem as string);
            break;
        }
      }
    },
    [
      focusedIndex,
      getColumnItems,
      onCourseTypeChange,
      focusedColumn,
      courseType,
      selectedSubgroup,
      selectedFileType,
      selectedScope,
      selectedFileId,
    ],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const items = getColumnItems(focusedColumn);
      const maxIndex = items.length - 1;
      let selectedItem: string | FileType | undefined;
      let newIndex: number;
      let allFiles: FileItem[];
      let subgroupFiles: FileItem[];
      let file: CourseTypeTemplate | undefined;
      let selectedFile: CourseTypeTemplate | undefined;
      let scopeFiles: FileItem[];
      let fileToGenerate: FileItem | undefined;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          newIndex = focusedIndex > 0 ? focusedIndex - 1 : maxIndex;
          setFocusedIndex(newIndex);
          selectedItem = items[newIndex];
          break;
        case "ArrowDown":
          e.preventDefault();
          newIndex = focusedIndex < maxIndex ? focusedIndex + 1 : 0;
          setFocusedIndex(newIndex);
          selectedItem = items[newIndex];
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (focusedColumn > 0) {
            handleColumnChange(focusedColumn - 1);
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (focusedColumn < 4) {
            handleColumnChange(focusedColumn + 1);
          }
          break;
        case "Enter":
          e.preventDefault();
          selectedItem = items[focusedIndex];
          if (selectedItem) {
            switch (focusedColumn) {
              case 0:
                allFiles = Object.values(fileStructure).flatMap((subgroup) =>
                  subgroup.flatMap((file) => file.files),
                );
                downloadFileTypeAsZip(
                  courseType,
                  `${selectedItem}-files-complete`,
                  allFiles,
                );
                break;
              case 1:
                subgroupFiles = fileStructure[selectedItem as string].flatMap(
                  (file) => file.files,
                );
                downloadFileTypeAsZip(
                  courseType,
                  `${selectedItem}-files-complete`,
                  subgroupFiles,
                );
                break;
              case 2:
                file = fileStructure[selectedSubgroup!].find(
                  (f: CourseTypeTemplate) => f.name === selectedItem,
                );
                if (file) {
                  downloadFileTypeAsZip(
                    courseType,
                    selectedItem as string,
                    file.files,
                  );
                }
                break;
              case 3:
                selectedFile = fileStructure[selectedSubgroup!].find(
                  (f: CourseTypeTemplate) => f.name === selectedFileType,
                );
                if (selectedFile) {
                  scopeFiles = selectedFile.files.filter(
                    (f) => f.type === selectedItem,
                  );
                  downloadFileTypeAsZip(
                    courseType,
                    `${selectedFileType}-${selectedItem}`,
                    scopeFiles,
                  );
                }
                break;
              case 4:
                fileToGenerate = selectedFile?.files.find(
                  (f) => f.id === selectedItem,
                );
                if (fileToGenerate) {
                  generateFile(fileToGenerate, true);
                }
                break;
            }
          }
          break;
      }

      // Select the focused item
      if (selectedItem && e.key !== "Enter") {
        switch (focusedColumn) {
          case 0:
            onCourseTypeChange(selectedItem as string);
            break;
          case 1:
            setSelectedSubgroup(selectedItem as string);
            break;
          case 2:
            setSelectedFileType(selectedItem as string);
            break;
          case 3:
            setSelectedScope(selectedItem as FileType);
            break;
          case 4:
            setSelectedFileId(selectedItem as string);
            break;
        }
      }
    },
    [
      focusedColumn,
      focusedIndex,
      getColumnItems,
      onCourseTypeChange,
      handleColumnChange,
      courseType,
      fileStructure,
      selectedSubgroup,
      selectedFileType,
      generateFile,
    ],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Update focus when selection changes
  useEffect(() => {
    const items = getColumnItems(focusedColumn);
    const selectedItem = items.find((item) => {
      switch (focusedColumn) {
        case 0:
          return item === courseType;
        case 1:
          return item === selectedSubgroup;
        case 2:
          return item === selectedFileType;
        case 3:
          return item === selectedScope;
        case 4:
          return item === selectedFileId;
        default:
          return false;
      }
    });

    if (selectedItem) {
      setFocusedIndex(items.indexOf(selectedItem));
    }
  }, [
    courseType,
    selectedSubgroup,
    selectedFileType,
    selectedScope,
    selectedFileId,
    focusedColumn,
    getColumnItems,
  ]);

  const renderColumn = (column: number) => {
    let selectedFile: CourseTypeTemplate | undefined;
    let scopes: FileType[] = [];
    let files: FileItem[] = [];

    if (selectedSubgroup && selectedFileType) {
      selectedFile = fileStructure[selectedSubgroup].find(
        (f: CourseTypeTemplate) => f.name === selectedFileType,
      );
    }

    if (selectedFile) {
      scopes = ["course-wide", "chapter", "tile"].filter((scope: string) =>
        selectedFile?.files.some((f: FileItem) => f.type === scope),
      ) as FileType[];
    }

    if (selectedSubgroup && selectedFileType && selectedScope) {
      files =
        fileStructure[selectedSubgroup]
          .find((f: CourseTypeTemplate) => f.name === selectedFileType)
          ?.files.filter((f: FileItem) => f.type === selectedScope) ?? [];
    }

    const selectedFileItem = files.find((f) => f.id === selectedFileId);

    switch (column) {
      case 0:
        return (
          <Column title="Course Type">
            {COURSE_TYPES.map((type, index) => (
              <ColumnItem
                key={type}
                icon={Folder}
                label={type}
                isSelected={courseType.toLowerCase() === type.toLowerCase()}
                isFocused={focusedColumn === 0 && focusedIndex === index}
                onClick={() => {
                  handleColumnChange(0);
                  setFocusedIndex(index);
                  onCourseTypeChange(type);
                }}
                downloadButton={
                  <DownloadButton
                    onClick={(e) => {
                      e.stopPropagation();
                      const allFiles = Object.values(fileStructure).flatMap(
                        (subgroup) => subgroup.flatMap((file) => file.files),
                      );
                      downloadFileTypeAsZip(
                        courseType,
                        `${type}-files-complete`,
                        allFiles,
                      );
                    }}
                  />
                }
              />
            ))}
          </Column>
        );

      case 1:
        return (
          <Column title="File Subgroup">
            {Object.keys(fileStructure).length === 0 ? (
              <div className="flex items-center justify-center p-4 text-xs text-neutral-400">
                Select a course type
              </div>
            ) : (
              Object.keys(fileStructure).map((subgroup, index) => (
                <ColumnItem
                  key={subgroup}
                  icon={Folder}
                  label={subgroup}
                  isSelected={selectedSubgroup === subgroup}
                  isFocused={focusedColumn === 1 && focusedIndex === index}
                  onClick={() => {
                    handleColumnChange(1);
                    setFocusedIndex(index);
                    setSelectedSubgroup(subgroup);
                  }}
                  downloadButton={
                    <DownloadButton
                      onClick={(e) => {
                        e.stopPropagation();
                        const subgroupFiles = fileStructure[subgroup].flatMap(
                          (file) => file.files,
                        );
                        downloadFileTypeAsZip(
                          courseType,
                          `${subgroup}-files-complete`,
                          subgroupFiles,
                        );
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
          <Column title="File Type">
            {selectedSubgroup &&
              fileStructure[selectedSubgroup].map(
                (file: CourseTypeTemplate, index) => (
                  <ColumnItem
                    key={file.name}
                    icon={Folder}
                    label={file.name}
                    isSelected={selectedFileType === file.name}
                    isFocused={focusedColumn === 2 && focusedIndex === index}
                    onClick={() => {
                      handleColumnChange(2);
                      setFocusedIndex(index);
                      setSelectedFileType(file.name);
                    }}
                    downloadButton={
                      <DownloadButton
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadFileTypeAsZip(
                            courseType,
                            file.name,
                            file.files,
                          );
                        }}
                      />
                    }
                  />
                ),
              )}
          </Column>
        );

      case 3:
        return (
          <Column title="File Scope">
            {selectedFile &&
              scopes.map((scope, index) => (
                <ColumnItem
                  key={scope}
                  icon={Folder}
                  label={scope}
                  isSelected={selectedScope === scope}
                  isFocused={focusedColumn === 3 && focusedIndex === index}
                  onClick={() => {
                    handleColumnChange(3);
                    setFocusedIndex(index);
                    setSelectedScope(scope);
                  }}
                  downloadButton={
                    <DownloadButton
                      onClick={(e) => {
                        e.stopPropagation();
                        const scopeFiles = selectedFile.files.filter(
                          (f) => f.type === scope,
                        );
                        downloadFileTypeAsZip(
                          courseType,
                          `${selectedFileType}-${scope}`,
                          scopeFiles,
                        );
                      }}
                    />
                  }
                />
              ))}
          </Column>
        );

      case 4:
        return (
          <Column title="Files">
            {files.map((file, index) => (
              <ColumnItem
                key={file.id}
                icon={FileText}
                label={`${file.name}${file.order ? ` ${file.order}` : ""}.${file.fileFormat}`}
                isSelected={selectedFileId === file.id}
                isFocused={focusedColumn === 4 && focusedIndex === index}
                onClick={() => {
                  handleColumnChange(4);
                  setFocusedIndex(index);
                  setSelectedFileId(file.id);
                }}
                downloadButton={
                  <DownloadButton onClick={() => generateFile(file, true)} />
                }
              />
            ))}
          </Column>
        );

      case 5:
        return (
          <Column title="Preview" isLast>
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
  };

  return (
    <div className="h-full overflow-x-auto">
      <div className="grid h-full min-w-max grid-cols-5">
        {[0, 1, 2, 3, 4].map((column) => (
          <div key={column} className="h-full">
            {renderColumn(column)}
          </div>
        ))}
      </div>
    </div>
  );
}
