import { useState } from "react";
import Button from "./Button";
import FileType from "./FileType";

import { COURSE_TYPES } from "../constants/course-types";
import { MINI_TEMPLATE } from "../course-type-templates/mini-template";
import { JUNIOR_TEMPLATE } from "../course-type-templates/junior-template";
import { WO_TEMPLATE } from "../course-type-templates/wo-template";
import { READING_5_8_TEMPLATE } from "../course-type-templates/reading_5_8-template";
import { PROJECT_1_2_TEMPLATE } from "../course-type-templates/project_1_2-template";
import { PROJECT_3_4_TEMPLATE } from "../course-type-templates/project_3_4-template";
import { PROJECT_5_6_TEMPLATE } from "../course-type-templates/project_5_6-template";
import { PROJECT_7_8_TEMPLATE } from "../course-type-templates/project_7_8-template";
import { DUTCH_TEMPLATE } from "../course-type-templates/dutch-template";

function App() {
  const [courseType, setCourseType] = useState("wo");
  const [fileStructure, setFileStructure] = useState(
    getCourseTypeFileTemplate(courseType),
  );

  function getCourseTypeTemplate(courseType: string) {
    switch (courseType) {
      case "Mini":
        return MINI_TEMPLATE;
      case "Junior":
        return JUNIOR_TEMPLATE;
      case "WO":
        return WO_TEMPLATE;
      case "Reading 5-8":
        return READING_5_8_TEMPLATE;
      case "Project 1-2":
        return PROJECT_1_2_TEMPLATE;
      case "Project 3-4":
        return PROJECT_3_4_TEMPLATE;
      case "Project 5-6":
        return PROJECT_5_6_TEMPLATE;
      case "Project 7-8":
        return PROJECT_7_8_TEMPLATE;
      case "Dutch":
        return DUTCH_TEMPLATE;
      default:
        return {};
    }
  }

  function getCourseTypeFileTemplate(courseType: string) {
    const fileStructure: Record<string, CourseTypeTemplate[]> =
      getCourseTypeTemplate(courseType);

    prepareFiles(fileStructure);

    return fileStructure;
  }

  function prepareFiles(fileStructure: Record<string, CourseTypeTemplate[]>) {
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

  return (
    <div className="relative mx-auto flex h-full max-w-5xl flex-col gap-4 px-4 py-12">
      <header className="flex items-baseline justify-between">
        <h1 className="text-3xl font-bold">
          File cover generator -{" "}
          <span className="text-red-400">{courseType}</span>
        </h1>
        <button
          className="cursor-pointer rounded bg-neutral-900 px-3 py-2 text-sm font-bold text-neutral-100"
          onClick={() =>
            downloadCourseTypeAsZip(
              fileStructure,
              `${courseType}-files-complete`,
            )
          }
        >
          Download all files
        </button>
      </header>

      <hr className="border border-neutral-100" />

      <div className="relative grid h-full grid-cols-3 gap-4">
        <div className="sticky top-12 h-[75vh] rounded-lg border border-neutral-200">
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
            <span className="text-7xl">😯</span>
            <p className="mt-4 font-bold text-neutral-700 uppercase">
              table of contents
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1">
              {COURSE_TYPES.map((courseType) => (
                <Button
                  key={courseType}
                  onClick={() => {
                    setCourseType(courseType);
                    setFileStructure(getCourseTypeFileTemplate(courseType));
                  }}
                >
                  {courseType}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2 grid auto-rows-max gap-2">
          {Object.keys(fileStructure).map((fileSubGroup) => (
            <div key={fileSubGroup} className="mb-8 grid gap-2">
              <h2 className="border-l-4 border-l-red-400 pl-3 text-xl font-bold">
                {fileSubGroup}
              </h2>
              {fileStructure[fileSubGroup].map((file) => (
                <FileType
                  key={`${courseType}-${file.name}`}
                  courseType={courseType}
                  fileName={file.name}
                  files={file.files}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
