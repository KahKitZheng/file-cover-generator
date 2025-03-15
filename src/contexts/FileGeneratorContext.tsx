import { createContext, useContext, useState, ReactNode } from "react";
import { COURSE_TYPES } from "../constants/course-types";
import useCourseTypeFiles from "../hooks/useCourseTypeFiles";

type FileGeneratorContextType = {
  courseType: string;
  numChapters: number;
  numTiles: number;
  fileStructure: FileStructure;
  handleValueChange: (
    type: "courseType" | "chapters" | "tiles",
    value: string | number,
  ) => void;
};

const FileGeneratorContext = createContext<
  FileGeneratorContextType | undefined
>(undefined);

export function FileGeneratorProvider({ children }: { children: ReactNode }) {
  const { getCourseTypeFileTemplate } = useCourseTypeFiles();
  const [courseType, setCourseType] = useState(COURSE_TYPES[0]);
  const [numChapters, setNumChapters] = useState(4);
  const [numTiles, setNumTiles] = useState(12);
  const [fileStructure, setFileStructure] = useState<FileStructure>(
    getCourseTypeFileTemplate(courseType, numChapters, numTiles),
  );

  const handleValueChange = (
    type: "courseType" | "chapters" | "tiles",
    value: string | number,
  ) => {
    let chapters: number;
    let tiles: number;

    switch (type) {
      case "courseType":
        setCourseType(value as string);
        setFileStructure(
          getCourseTypeFileTemplate(value as string, numChapters, numTiles),
        );
        break;
      case "chapters":
        chapters = Math.max(1, Number(value));
        setNumChapters(chapters);
        setFileStructure(
          getCourseTypeFileTemplate(courseType, chapters, numTiles),
        );
        break;
      case "tiles":
        tiles = Math.max(1, Number(value));
        setNumTiles(tiles);
        setFileStructure(
          getCourseTypeFileTemplate(courseType, numChapters, tiles),
        );
        break;
    }
  };

  return (
    <FileGeneratorContext.Provider
      value={{
        courseType,
        numChapters,
        numTiles,
        fileStructure,
        handleValueChange,
      }}
    >
      {children}
    </FileGeneratorContext.Provider>
  );
}

export function useFileGenerator() {
  const context = useContext(FileGeneratorContext);
  if (context === undefined) {
    throw new Error(
      "useFileGenerator must be used within a FileGeneratorProvider",
    );
  }
  return context;
}
