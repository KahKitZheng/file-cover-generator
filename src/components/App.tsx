import { FileGeneratorProvider } from "../contexts/FileGeneratorContext";
import { useFileGenerator } from "../contexts/FileGeneratorContext";
import { NumberInput } from "./NumberInput";
import ColumnLayout from "./ColumnLayout";

function AppContent() {
  const { numChapters, numTiles, handleValueChange } = useFileGenerator();

  return (
    <main className="grid h-full w-full min-w-7xl place-items-center overflow-x-auto bg-neutral-50 p-12">
      <div className="flex h-full max-h-[750px] w-full flex-col rounded-2xl bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)]">
        <ColumnLayout />
        <footer className="flex items-center gap-6 px-4 py-2 text-xs">
          <NumberInput
            label="Nr. of chapters"
            value={numChapters}
            onChange={(value) => handleValueChange("chapters", value)}
            tabIndex={2}
          />
          <NumberInput
            label="Nr. of tiles"
            value={numTiles}
            onChange={(value) => handleValueChange("tiles", value)}
            tabIndex={3}
          />
        </footer>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <FileGeneratorProvider>
      <AppContent />
    </FileGeneratorProvider>
  );
}
