import * as COURSE_TYPE_TEMPLATES from "../course-type-templates";

export default function useCourseTypeFiles() {
  function getCourseTypeTemplate(courseType: string) {
    switch (courseType.toLowerCase()) {
      case "mini":
        return COURSE_TYPE_TEMPLATES.MINI;
      case "junior":
        return COURSE_TYPE_TEMPLATES.JUNIOR;
      case "wo":
        return COURSE_TYPE_TEMPLATES.WO;
      case "reading 5-8":
        return COURSE_TYPE_TEMPLATES.READING_5_8;
      case "project 1-2":
        return COURSE_TYPE_TEMPLATES.PROJECT_1_2;
      case "project 3-4":
        return COURSE_TYPE_TEMPLATES.PROJECT_3_4;
      case "project 5-6":
        return COURSE_TYPE_TEMPLATES.PROJECT_5_6;
      case "project 7-8":
        return COURSE_TYPE_TEMPLATES.PROJECT_7_8;
      case "dutch":
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
            name: file.name,
            type: "course-wide",
            order: undefined,
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
              name: file.name,
              type: "chapter",
              order: i,
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
              name: file.name,
              type: "tile",
              order: i,
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
