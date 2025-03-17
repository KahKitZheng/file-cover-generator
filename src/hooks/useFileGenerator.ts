import { useContext } from "react";
import { FileGeneratorContext } from "../contexts/FileGeneratorContext";

export function useFileGenerator() {
  const context = useContext(FileGeneratorContext);
  if (context === undefined) {
    throw new Error(
      "useFileGenerator must be used within a FileGeneratorProvider",
    );
  }
  return context;
}
