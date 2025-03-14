import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import ColumnLayout from "./ColumnLayout";
import useCourseTypeFiles from "../hooks/useCourseTypeFiles";

function App() {
  const params = useParams();
  const navigate = useNavigate();
  const courseTypeParam = params?.courseType?.replace("-", " ");

  const { getCourseTypeFileTemplate } = useCourseTypeFiles();

  const [courseType, setCourseType] = useState(courseTypeParam ?? "wo");
  const [fileStructure, setFileStructure] = useState<FileStructure>(
    getCourseTypeFileTemplate(courseType),
  );

  const handleCourseTypeChange = (newCourseType: string) => {
    setCourseType(newCourseType);
    setFileStructure(getCourseTypeFileTemplate(newCourseType));
    navigate(`/${newCourseType.replace(" ", "-").toLowerCase()}`);
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="flex-none p-4">
        <h1 className="text-3xl font-bold">
          File cover generator -{" "}
          <span className="text-red-400">
            {courseType.charAt(0).toUpperCase() + courseType.slice(1)}
          </span>
        </h1>
      </header>

      <hr className="border border-neutral-100" />

      <main className="flex-1 overflow-hidden">
        <div className="mx-auto h-full">
          <ColumnLayout
            key={courseType} // reset all columns when course type changes
            courseType={courseType}
            fileStructure={fileStructure}
            onCourseTypeChange={handleCourseTypeChange}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
