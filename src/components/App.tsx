import { useState } from "react";
import { COURSE_TYPES } from "../constants/course-types";
import ColumnLayout from "./ColumnLayout";
import useCourseTypeFiles from "../hooks/useCourseTypeFiles";

function App() {
  const { getCourseTypeFileTemplate } = useCourseTypeFiles();

  const [courseType, setCourseType] = useState(COURSE_TYPES[0]);
  const [fileStructure, setFileStructure] = useState<FileStructure>(
    getCourseTypeFileTemplate(courseType),
  );

  const handleCourseTypeChange = (newCourseType: string) => {
    setCourseType(newCourseType);
    setFileStructure(getCourseTypeFileTemplate(newCourseType));
  };

  return (
    <main className="grid h-full w-full min-w-7xl place-items-center overflow-x-auto bg-neutral-200 p-12">
      <ColumnLayout
        key={courseType} // reset all columns when course type changes
        courseType={courseType}
        fileStructure={fileStructure}
        onCourseTypeChange={handleCourseTypeChange}
      />
    </main>
  );
}

export default App;
