import FileType from "./FileType";
import { WO_TEMPLATE } from "../course-type-templates/wo-template";
import { useState } from "react";

function App() {
  const [courseType, setCourseType] = useState("wo");
  const [fileStructure, setFileStructure] = useState(
    getCourseTypeFileTemplate(),
  );

  function getCourseTypeTemplate() {
    switch (courseType) {
      case "wo":
        return WO_TEMPLATE;
      default:
        return WO_TEMPLATE;
    }
  }

  function getCourseTypeFileTemplate() {
    const fileStructure: Record<string, CourseTypeTemplate[]> =
      getCourseTypeTemplate();

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
          File cover generator - <span className="text-red-400">dutch</span>
        </h1>
        <button className="cursor-pointer rounded bg-neutral-900 px-3 py-2 text-sm font-bold text-neutral-100">
          Download all files
        </button>
      </header>

      <hr className="border border-neutral-100" />

      <div className="relative grid h-full grid-cols-3 gap-4">
        <div className="sticky top-12 h-[75vh] rounded-lg border border-neutral-200">
          <div className="flex h-full flex-col items-center justify-center">
            <span className="text-7xl">😯</span>
            <p className="mt-4 font-bold text-neutral-700 uppercase">
              table of contents
            </p>
          </div>
        </div>

        <div className="col-span-2 grid auto-rows-max gap-2">
          {Object.keys(fileStructure).map((fileSubGroup) => {
            return fileStructure[fileSubGroup].length > 0 ? (
              <div key={fileSubGroup} className="mb-8 grid gap-2">
                <h2 className="border-l-4 border-l-red-400 pl-3 text-xl font-bold">
                  {fileSubGroup}
                </h2>
                {fileStructure[fileSubGroup].map((file) => (
                  <FileType
                    key={file.name}
                    fileName={file.name}
                    files={file.files}
                  />
                ))}
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
