import { useState, useCallback, useEffect } from "react";
import { COURSE_TYPES } from "../constants/course-types";

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

type UseColumnNavigationProps = {
  courseType: string;
  fileStructure: FileStructure;
  onCourseTypeChange: (courseType: string) => void;
  generateFile: (file: FileItem, download: boolean) => void;
};

export function useColumnNavigation({
  courseType,
  fileStructure,
  onCourseTypeChange,
  generateFile,
}: UseColumnNavigationProps) {
  const [selection, setSelection] = useState<Selection>({
    subgroup: null,
    fileType: null,
    scope: null,
    fileId: null,
  });

  const [focus, setFocus] = useState<Focus>(() => ({
    column: 0,
    index: Math.max(
      0,
      COURSE_TYPES.findIndex(
        (type) => type.toLowerCase() === courseType.toLowerCase(),
      ),
    ),
  }));

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
          if (selection.subgroup) {
            items = fileStructure[selection.subgroup].map(
              (f: CourseTypeTemplate) => f.name,
            );
          }
          break;
        case 3:
          if (selection.subgroup && selection.fileType) {
            selectedFile = fileStructure[selection.subgroup].find(
              (f: CourseTypeTemplate) => f.name === selection.fileType,
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
          if (selection.subgroup && selection.fileType && selection.scope) {
            selectedFile = fileStructure[selection.subgroup].find(
              (f: CourseTypeTemplate) => f.name === selection.fileType,
            );
            if (selectedFile) {
              items = selectedFile.files
                .filter((f: FileItem) => f.type === selection.scope)
                .map((f: FileItem) => f.id);
            }
          }
          break;
      }

      return items;
    },
    [fileStructure, selection],
  );

  const handleColumnChange = useCallback(
    (newColumn: number) => {
      const items = getColumnItems(newColumn);
      const maxIndex = items.length - 1;

      // When moving back, use the previous index if it exists in the new column
      let newIndex: number;
      if (newColumn < focus.column) {
        // Get the previously selected item in the new column
        const previousSelectedItem = (() => {
          switch (newColumn) {
            case 0:
              return courseType;
            case 1:
              return selection.subgroup;
            case 2:
              return selection.fileType;
            case 3:
              return selection.scope;
            case 4:
              return selection.fileId;
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
        newIndex = Math.min(focus.index, maxIndex);
      }

      setFocus({ column: newColumn, index: newIndex });

      // Reset next column's selection when moving back
      if (newColumn < focus.column) {
        setSelection((prev) => {
          const newSelection = { ...prev };
          switch (focus.column) {
            case 1:
              newSelection.subgroup = null;
              newSelection.fileType = null;
              newSelection.scope = null;
              newSelection.fileId = null;
              break;
            case 2:
              newSelection.fileType = null;
              newSelection.scope = null;
              newSelection.fileId = null;
              break;
            case 3:
              newSelection.scope = null;
              newSelection.fileId = null;
              break;
            case 4:
              newSelection.fileId = null;
              break;
          }
          return newSelection;
        });
      }

      // Select the focused item when changing columns
      const selectedItem = items[newIndex];
      if (selectedItem) {
        switch (newColumn) {
          case 0:
            onCourseTypeChange(selectedItem as string);
            break;
          case 1:
            setSelection((prev) => ({
              ...prev,
              subgroup: selectedItem as string,
            }));
            break;
          case 2:
            setSelection((prev) => ({
              ...prev,
              fileType: selectedItem as string,
            }));
            break;
          case 3:
            setSelection((prev) => ({
              ...prev,
              scope: selectedItem as FileType,
            }));
            break;
          case 4:
            setSelection((prev) => ({
              ...prev,
              fileId: selectedItem as string,
            }));
            break;
        }
      }
    },
    [focus, getColumnItems, onCourseTypeChange, courseType, selection],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Only handle keyboard events when the column layout is focused
      const columnLayout = document.querySelector(
        '[data-column-layout="true"]',
      );
      if (document.activeElement !== columnLayout) {
        return;
      }

      const items = getColumnItems(focus.column);
      const maxIndex = items.length - 1;
      let selectedItem: string | FileType | undefined;
      let newIndex: number;
      let selectedFile: CourseTypeTemplate | undefined;
      let fileToGenerate: FileItem | undefined;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          newIndex = focus.index > 0 ? focus.index - 1 : maxIndex;
          setFocus((prev) => ({ ...prev, index: newIndex }));
          selectedItem = items[newIndex];
          break;
        case "ArrowDown":
          e.preventDefault();
          newIndex = focus.index < maxIndex ? focus.index + 1 : 0;
          setFocus((prev) => ({ ...prev, index: newIndex }));
          selectedItem = items[newIndex];
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (focus.column > 0) {
            handleColumnChange(focus.column - 1);
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (focus.column < 4) {
            handleColumnChange(focus.column + 1);
          }
          break;
        case "Enter":
          e.preventDefault();
          selectedItem = items[focus.index];
          if (selectedItem) {
            switch (focus.column) {
              case 0:
                onCourseTypeChange(selectedItem as string);
                break;
              case 1:
                setSelection((prev) => ({
                  ...prev,
                  subgroup: selectedItem as string,
                }));
                break;
              case 2:
                setSelection((prev) => ({
                  ...prev,
                  fileType: selectedItem as string,
                }));
                break;
              case 3:
                setSelection((prev) => ({
                  ...prev,
                  scope: selectedItem as FileType,
                }));
                break;
              case 4:
                if (selection.subgroup && selection.fileType) {
                  selectedFile = fileStructure[selection.subgroup].find(
                    (f: CourseTypeTemplate) => f.name === selection.fileType,
                  );
                  fileToGenerate = selectedFile?.files.find(
                    (f) => f.id === selectedItem,
                  );
                  if (fileToGenerate) {
                    generateFile(fileToGenerate, true);
                  }
                }
                break;
            }
          }
          break;
      }

      // Select the focused item
      if (selectedItem && e.key !== "Enter") {
        switch (focus.column) {
          case 0:
            onCourseTypeChange(selectedItem as string);
            break;
          case 1:
            setSelection((prev) => ({
              ...prev,
              subgroup: selectedItem as string,
            }));
            break;
          case 2:
            setSelection((prev) => ({
              ...prev,
              fileType: selectedItem as string,
            }));
            break;
          case 3:
            setSelection((prev) => ({
              ...prev,
              scope: selectedItem as FileType,
            }));
            break;
          case 4:
            setSelection((prev) => ({
              ...prev,
              fileId: selectedItem as string,
            }));
            break;
        }
      }
    },
    [
      focus,
      getColumnItems,
      onCourseTypeChange,
      handleColumnChange,
      fileStructure,
      selection,
      generateFile,
    ],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Reset all states when course type changes
  useEffect(() => {
    setFocus({
      column: 0,
      index: 0,
    });
    setSelection({
      subgroup: null,
      fileType: null,
      scope: null,
      fileId: null,
    });

    // Focus the column layout after a short delay to ensure the DOM has updated
    setTimeout(() => {
      const columnLayout = document.querySelector(
        '[data-column-layout="true"]',
      );
      if (columnLayout instanceof HTMLElement) {
        columnLayout.focus();
      }
    }, 0);
  }, [courseType]);

  // Update focus when selection changes
  useEffect(() => {
    const items = getColumnItems(focus.column);
    const selectedItem = items.find((item) => {
      switch (focus.column) {
        case 0:
          return item === courseType;
        case 1:
          return item === selection.subgroup;
        case 2:
          return item === selection.fileType;
        case 3:
          return item === selection.scope;
        case 4:
          return item === selection.fileId;
        default:
          return false;
      }
    });

    if (selectedItem) {
      setFocus((prev) => ({ ...prev, index: items.indexOf(selectedItem) }));
    }
  }, [courseType, selection, focus.column, getColumnItems]);

  return {
    selection,
    focus,
    handleColumnChange: (column: number, index: number) => {
      setFocus({ column, index });
      handleColumnChange(column);
    },
    setSelection,
  };
}
