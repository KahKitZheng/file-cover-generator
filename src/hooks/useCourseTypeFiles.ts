import * as COURSE_TYPE_TEMPLATES from "../course-type-templates";

export default function useCourseTypeFiles() {
  function getCourseTypeTemplate(courseType: string) {
    switch (courseType.toLowerCase()) {
      case "dutch":
        return COURSE_TYPE_TEMPLATES.DUTCH;
      case "junior":
        return COURSE_TYPE_TEMPLATES.JUNIOR;
      case "mini":
        return COURSE_TYPE_TEMPLATES.MINI;
      case "project 1/2":
        return COURSE_TYPE_TEMPLATES.PROJECT_1_2;
      case "project 3/4":
        return COURSE_TYPE_TEMPLATES.PROJECT_3_4;
      case "project 5/6":
        return COURSE_TYPE_TEMPLATES.PROJECT_5_6;
      case "project 7/8":
        return COURSE_TYPE_TEMPLATES.PROJECT_7_8;
      case "reading 5/8":
        return COURSE_TYPE_TEMPLATES.READING_5_8;
      case "wo":
        return COURSE_TYPE_TEMPLATES.WO;
      default:
        return {};
    }
  }

  function prepareFiles(
    fileStructure: FileStructure,
    numChapters: number,
    numTiles: number,
  ) {
    Object.values(fileStructure).forEach((fileSubGroup) => {
      fileSubGroup.forEach((file) => {
        // Clear existing files array
        file.files = [];

        // Add course-wide file if applicable
        if (file.category.course === true) {
          const courseWideFile: FileItem = {
            id: `${fileSubGroup}-course-wide-${file.name}`,
            name: file.name,
            type: "course-wide",
            order: undefined,
            fileFormat: "pdf",
          };
          file.files.push(courseWideFile);
        }

        // Add chapter files if applicable
        if (file.category.chapter === true) {
          for (let i = 1; i <= numChapters; i++) {
            const chapterFile: FileItem = {
              id: `${fileSubGroup}-chapter-${i}-${file.name}`,
              name: file.name,
              type: "chapter",
              order: i,
              fileFormat: "pdf",
            };
            file.files.push(chapterFile);
          }
        }

        // Add tile files if applicable
        if (file.category.tile === true) {
          for (let i = 1; i <= numTiles; i++) {
            const tileFile: FileItem = {
              id: `${fileSubGroup}-tile-${i}-${file.name}`,
              name: file.name,
              type: "tile",
              order: i,
              fileFormat: "pdf",
            };
            file.files.push(tileFile);
          }
        }
      });
    });
  }

  function getCourseTypeFileTemplate(
    courseType: string,
    numChapters: number = 4,
    numTiles: number = 12,
  ) {
    const fileStructure: FileStructure = getCourseTypeTemplate(courseType);

    prepareFiles(fileStructure, numChapters, numTiles);

    return fileStructure;
  }

  return { getCourseTypeFileTemplate };
}
