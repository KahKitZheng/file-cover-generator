import FileType from "./FileType";

const files: FileItem[] = [
  {
    id: "course-wide",
    name: "Themabreed",
    type: "course-wide",
    format: "pdf",
    isGenerated: false,
    isGenerating: false,
  },
  {
    id: "chapter-1",
    name: "Deel 1",
    type: "chapter",
    format: "pdf",
    isGenerated: false,
    isGenerating: false,
  },
  {
    id: "tile-1",
    name: "Tegel 1",
    type: "tile",
    format: "pdf",
    isGenerated: false,
    isGenerating: false,
  },
  {
    id: "tile-2",
    name: "Tegel 2",
    type: "tile",
    format: "pdf",
    isGenerated: false,
    isGenerating: false,
  },
  {
    id: "tile-3",
    name: "Tegel 3",
    type: "tile",
    format: "pdf",
    isGenerated: false,
    isGenerating: false,
  },
];

function App() {
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
          <FileType fileName="Doeboek" files={files} />
          <FileType fileName="Antwoorden doeboek" files={files} />
        </div>
      </div>
    </div>
  );
}

export default App;
