import { useState } from "react";
import { COURSE_TYPES } from "../constants/course-types";
import ColumnLayout from "./ColumnLayout";
import useCourseTypeFiles from "../hooks/useCourseTypeFiles";

function App() {
  const { getCourseTypeFileTemplate } = useCourseTypeFiles();

  const [courseType, setCourseType] = useState(COURSE_TYPES[0]);
  const [numChapters, setNumChapters] = useState(4);
  const [numTiles, setNumTiles] = useState(12);
  const [fileStructure, setFileStructure] = useState<FileStructure>(
    getCourseTypeFileTemplate(courseType, numChapters, numTiles),
  );

  const handleCourseTypeChange = (newCourseType: string) => {
    setCourseType(newCourseType);
    setFileStructure(
      getCourseTypeFileTemplate(newCourseType, numChapters, numTiles),
    );
  };

  const handleChaptersChange = (value: number) => {
    setNumChapters(value);
    setFileStructure(getCourseTypeFileTemplate(courseType, value, numTiles));
  };

  const handleTilesChange = (value: number) => {
    setNumTiles(value);
    setFileStructure(getCourseTypeFileTemplate(courseType, numChapters, value));
  };

  return (
    <main className="grid h-full w-full min-w-7xl place-items-center overflow-x-auto bg-neutral-50 p-12">
      <div className="flex h-full max-h-[750px] w-full flex-col rounded-2xl bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)]">
        <ColumnLayout
          courseType={courseType}
          fileStructure={fileStructure}
          onCourseTypeChange={handleCourseTypeChange}
        />
        <footer className="flex items-center gap-6 px-4 py-2 text-xs">
          <div className="flex items-center gap-2">
            <p>Nr. of chapters</p>
            <input
              tabIndex={2}
              type="number"
              min={1}
              value={numChapters}
              onChange={(e) =>
                handleChaptersChange(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="h-5 w-8 rounded border border-neutral-300 px-2 py-0.5 text-right focus:outline-2 focus:outline-neutral-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <p>Nr. of tiles</p>
            <input
              tabIndex={3}
              type="number"
              min={1}
              value={numTiles}
              onChange={(e) =>
                handleTilesChange(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="h-5 w-8 rounded border border-neutral-300 px-2 py-0.5 text-right focus:outline-2 focus:outline-neutral-400"
            />
          </div>
        </footer>
      </div>
    </main>
  );
}

export default App;
