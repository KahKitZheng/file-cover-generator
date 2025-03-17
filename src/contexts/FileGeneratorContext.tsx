import { createContext } from "react";

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

export const FileGeneratorContext = createContext<
  FileGeneratorContextType | undefined
>(undefined);
