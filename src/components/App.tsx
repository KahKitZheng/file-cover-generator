import { FileGeneratorProvider } from "../contexts/FileGeneratorContext";
import { useFileGenerator } from "../contexts/FileGeneratorContext";
import { NumberInput } from "./NumberInput";
import ColumnLayout from "./ColumnLayout";
import { ThemeProvider } from "../contexts/ThemeContext";
import { ThemeSelector } from "./ThemeSelector";
import { useTheme } from "../contexts/ThemeContext";
import { CSSProperties } from "react";
import { themeStyles } from "../styles/themes";

function AppContent() {
  const { numChapters, numTiles, handleValueChange } = useFileGenerator();
  const { theme } = useTheme();

  const currentTheme = themeStyles[theme];

  const customProperties = {
    "--theme-active": currentTheme.activeState,
    "--theme-hover": currentTheme.hoverState,
    "--theme-accent": currentTheme.accentState,
    "--theme-focus-ring": currentTheme.focusRing,
    "--theme-outline": currentTheme.outline,
  } as CSSProperties;

  return (
    <main
      className={`grid h-screen w-full min-w-7xl place-items-center p-12 ${currentTheme.mainBg}`}
    >
      <div
        className={`flex h-[750px] w-full flex-col rounded-2xl ${currentTheme.containerBg} ${currentTheme.shadow} ${currentTheme.text}`}
        style={customProperties}
      >
        <ColumnLayout />
        <footer className="flex items-center justify-between px-4 py-2 text-xs">
          <div className="flex items-center gap-6">
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
          </div>
          <ThemeSelector />
        </footer>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <FileGeneratorProvider>
        <AppContent />
      </FileGeneratorProvider>
    </ThemeProvider>
  );
}
