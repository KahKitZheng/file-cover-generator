import { useEffect, useState } from "react";
import { COURSE_TYPES } from "../constants/course-types";
import { downloadCourseTypeAsZip } from "../utils/downloadCourseType";
import Button from "./Button";
import FileType from "./FileType";
import useCourseTypeFiles from "../hooks/useCourseTypeFiles";

function App() {
  const [courseType, setCourseType] = useState("WO");
  const [fileStructure, setFileStructure] = useState<FileStructure>({});

  const { getCourseTypeFileTemplate } = useCourseTypeFiles();

  useEffect(() => {
    setFileStructure(getCourseTypeFileTemplate(courseType));
  }, [courseType, getCourseTypeFileTemplate]);

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
