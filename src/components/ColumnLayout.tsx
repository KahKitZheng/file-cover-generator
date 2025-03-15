import { useFileGenerator } from "../contexts/FileGeneratorContext";
import { useFileGeneration } from "../hooks/useFileGeneration";
import { useColumnNavigation } from "../hooks/useColumnNavigation";
import { ColumnRenderer } from "./ColumnRenderer";

export default function ColumnLayout() {
  const { courseType, fileStructure, handleValueChange } = useFileGenerator();
  const { generateFile } = useFileGeneration();
  const { selection, focus, handleColumnChange, setSelection } =
    useColumnNavigation({
      courseType,
      fileStructure,
      onCourseTypeChange: (type) => handleValueChange("courseType", type),
      generateFile,
    });

  const columns = Array.from({ length: 5 }, (_, index) => index);

  const handleSelectionChange = (column: number, value: string | FileType) => {
    handleColumnChange(column, 0);
    if (column === 0) {
      handleValueChange("courseType", value as string);
    } else {
      setSelection((prev) => {
        const newSelection = { ...prev };
        switch (column) {
          case 1:
            newSelection.subgroup = value as string;
            break;
          case 2:
            newSelection.fileType = value as string;
            break;
          case 3:
            newSelection.scope = value as FileType;
            break;
          case 4:
            newSelection.fileId = value as string;
            break;
        }
        return newSelection;
      });
    }
  };

  return (
    <div
      className="grid min-h-0 flex-1 grid-cols-5 overflow-hidden rounded-t-2xl focus:outline-2 focus:outline-neutral-400"
      tabIndex={1}
      data-column-layout="true"
    >
      {columns.map((column) => (
        <div key={column} className="h-full min-h-0">
          <ColumnRenderer
            column={column}
            courseType={courseType}
            fileStructure={fileStructure}
            selection={selection}
            focus={focus}
            onColumnChange={handleColumnChange}
            onSelectionChange={handleSelectionChange}
          />
        </div>
      ))}
    </div>
  );
}
