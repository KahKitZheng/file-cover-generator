import * as COURSE_TYPE_TEMPLATES from "../course-type-templates";

export default function useCourseTypeFiles() {
  function getCourseTypeTemplate(courseType: string) {
    switch (courseType) {
      case "Mini":
        return COURSE_TYPE_TEMPLATES.MINI;
      case "Junior":
        return COURSE_TYPE_TEMPLATES.JUNIOR;
      case "WO":
        return COURSE_TYPE_TEMPLATES.WO;
      case "Reading 5-8":
        return COURSE_TYPE_TEMPLATES.READING_5_8;
      case "Project 1-2":
        return COURSE_TYPE_TEMPLATES.PROJECT_1_2;
      case "Project 3-4":
        return COURSE_TYPE_TEMPLATES.PROJECT_3_4;
      case "Project 5-6":
        return COURSE_TYPE_TEMPLATES.PROJECT_5_6;
      case "Project 7-8":
        return COURSE_TYPE_TEMPLATES.PROJECT_7_8;
      case "Dutch":
        return COURSE_TYPE_TEMPLATES.DUTCH;
      default:
        return {};
    }
  }

  function prepareFiles(fileStructure: FileStructure) {
    return Object.values(fileStructure).forEach((fileSubGroup) => {
      fileSubGroup.forEach((file) => {
        if (file.category.course === true) {
          const courseWideFile: FileItem = {
            id: `${fileSubGroup}-course-wide-${file.name}`,
            name: "Course-wide",
            type: "course-wide",
            fileFormat: "pdf",
          };

          if (!file.files.some((f) => f.id === courseWideFile.id)) {
            file.files.push(courseWideFile);
          }
        }

        if (file.category.chapter === true) {
          for (let i = 1; i <= 4; i++) {
            const chapterFile: FileItem = {
              id: `${fileSubGroup}-chapter-${i}-${file.name}`,
              name: `Chapter ${i}`,
              type: "chapter",
              fileFormat: "pdf",
            };

            if (!file.files.some((f) => f.id === chapterFile.id)) {
              file.files.push(chapterFile);
            }
          }
        }

        if (file.category.tile === true) {
          for (let i = 1; i <= 12; i++) {
            const tileFile: FileItem = {
              id: `${fileSubGroup}-tile-${i}-${file.name}`,
              name: `Tile ${i}`,
              type: "tile",
              fileFormat: "pdf",
            };

            if (!file.files.some((f) => f.id === tileFile.id)) {
              file.files.push(tileFile);
            }
          }
        }
      });
    });
  }

  function getCourseTypeFileTemplate(courseType: string) {
    const fileStructure: FileStructure = getCourseTypeTemplate(courseType);

    prepareFiles(fileStructure);

    return fileStructure;
  }

  return { getCourseTypeFileTemplate };
}
