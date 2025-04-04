type FileStructure = Record<string, CourseTypeTemplate[]>;

type CourseTypeTemplate = {
  name: string;
  category: {
    course: boolean;
    chapter: boolean;
    tile: boolean;
  };
  files: FileItem[];
};

type Template = Record<string, CourseTypeTemplate[]>;

// Files
type FileType = "course-wide" | "chapter" | "tile";

type FileFormat = "pdf";

type FileItem = {
  id: string;
  name: string;
  type: FileType;
  fileFormat: FileFormat;
  order?: number;
  subgroup?: string;
  fileType?: string;
};
