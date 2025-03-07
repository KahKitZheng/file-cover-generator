type Template = Record<string, string[]>;

type FileType = "course-wide" | "chapter" | "tile";
type FileFormat = "pdf";

interface FileItem {
  id: string;
  name: string;
  type: FileType;
  format: FileFormat;
  isGenerated: boolean;
  isGenerating: boolean;
}
