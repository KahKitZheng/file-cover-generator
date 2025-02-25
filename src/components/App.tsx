import { useState } from "react";
import { TEMPLATE_DEFAULT } from "../templates/default";

function App() {
  const [selectedType, setSelectedType] = useState("default");

  const [chapterAmount, setChapterAmount] = useState(4);
  const [tilesAmount, setTilesAmount] = useState(5);

  const filesByType = getTemplateByType(selectedType);

  function getTemplateByType(type: string) {
    switch (type) {
      case "default":
        return TEMPLATE_DEFAULT;
      default:
        return {};
    }
  }

  return (
    <main className="max-w-7xl mx-auto py-12 grid gap-8 relative">
      <h1 className="text-3xl font-bold">
        File cover generator - type{" "}
        <i className="text-blue-400">{selectedType}</i>
      </h1>

      <div className="grid gap-2 w-fit">
        <div className="grid grid-cols-2 gap-12">
          <label>Nr. of chapter</label>
          <input
            type="number"
            min={1}
            value={chapterAmount}
            onChange={(e) => setChapterAmount(Number(e.target.value))}
            className="border w-12 text-right h-6 text-sm px-2 rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-12">
          <label>Nr. of tiles per chapter</label>
          <input
            type="number"
            min={1}
            value={tilesAmount}
            onChange={(e) => setTilesAmount(Number(e.target.value))}
            className="border w-12 text-right h-6 text-sm px-2 rounded"
          />
        </div>
      </div>

      <div className="grid gap-y-8 gap-12 grid-cols-5 -mx-2">
        <div className="grid gap-y-2 col-span-3">
          {Object.keys(filesByType).map((fileSubgroup, index) => (
            <section key={index}>
              <header className="border-b-2 py-1 my-2 border-neutral-200">
                <h2 className="font-bold text-lg px-2">{fileSubgroup}</h2>
              </header>
              <div className="grid gap-1 px-2">
                {filesByType[fileSubgroup].map((fileName) => (
                  <div
                    key={fileName}
                    // className="flex justify-between gap-4 items-center"
                    className="grid grid-cols-[200px_1fr] gap-4 items-baseline"
                  >
                    <p className="inline w-fit text-sm">{fileName}</p>
                    <div className="flex justify-end gap-6 items-baseline">
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          // checked
                          className="accent-blue-300 h-3 w-3"
                        />
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {Array.from({ length: chapterAmount }).map(
                          (_, index) => (
                            <input
                              key={`chapter-${index}`}
                              type="checkbox"
                              // checked
                              className="accent-green-300 h-3 w-3"
                            />
                          )
                        )}
                      </div>
                      <div className="flex gap-x-4 gap-y-1 flex-wrap">
                        {Array.from({ length: chapterAmount }).map(
                          (_, index) => (
                            <div
                              key={`tiles-chapter-${index}`}
                              className="flex gap-1 overflow-auto"
                            >
                              {Array.from({ length: tilesAmount }).map(
                                (_, index) => (
                                  <input
                                    key={`tile-${index}`}
                                    type="checkbox"
                                    // checked
                                    className="accent-red-300 h-3 w-3 indeterminate:bg-neutral-900"
                                  />
                                )
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
          {Object.keys(filesByType).map((fileSubgroup, index) => (
            <section key={index}>
              <header className="border-b-2 py-1 my-2 border-neutral-200">
                <h2 className="font-bold text-lg px-2">{fileSubgroup}</h2>
              </header>
              <div className="grid gap-1 px-2">
                {filesByType[fileSubgroup].map((fileName) => (
                  <div
                    key={fileName}
                    // className="flex justify-between gap-4 items-center"
                    className="grid grid-cols-[200px_1fr] gap-4 items-baseline"
                  >
                    <p className="inline w-fit text-sm">{fileName}</p>
                    <div className="flex justify-end gap-6 items-baseline">
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          // checked
                          className="accent-blue-300 h-3 w-3"
                        />
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {Array.from({ length: chapterAmount }).map(
                          (_, index) => (
                            <input
                              key={`chapter-${index}`}
                              type="checkbox"
                              // checked
                              className="accent-green-300 h-3 w-3"
                            />
                          )
                        )}
                      </div>
                      <div className="flex gap-x-4 gap-y-1 flex-wrap">
                        {Array.from({ length: chapterAmount }).map(
                          (_, index) => (
                            <div
                              key={`tiles-chapter-${index}`}
                              className="flex gap-1 overflow-auto"
                            >
                              {Array.from({ length: tilesAmount }).map(
                                (_, index) => (
                                  <input
                                    key={`tile-${index}`}
                                    type="checkbox"
                                    // checked
                                    className="accent-red-300 h-3 w-3 indeterminate:bg-neutral-900"
                                  />
                                )
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="sticky top-32 right-4 h-[80vh] col-span-2 pt-12">
          <div className="border border-neutral-200 p-8 rounded h-full aspect-[1/1.414] mx-auto flex items-start flex-col justify-center shadow-lg">
            <div>
              <small className="uppercase text-xs">Course-wide</small>
              <p className="text-3xl font-black w-fit mb-2">
                Example file name
              </p>
              <p className="text-sm">Van boer tot piloot (ID: 1)</p>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <button className="mt-12 cursor-pointer bg-neutral-700 text-neutral-100 px-4 py-2 rounded font-bold text-sm">
          Download file covers
        </button>
      </footer>
    </main>
  );
}

export default App;
