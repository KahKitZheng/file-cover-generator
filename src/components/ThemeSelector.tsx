import { useTheme } from "../contexts/ThemeContext";
import type { Theme } from "../contexts/ThemeContext";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const themes: Array<{ id: Theme; label: string; color: string }> = [
    {
      id: "light",
      label: "Light",
      color: "bg-white border border-neutral-200",
    },
    { id: "dark", label: "Dark", color: "bg-neutral-900" },
    { id: "blue", label: "Blue", color: "bg-blue-500" },
    { id: "indigo", label: "Indigo", color: "bg-indigo-500" },
    { id: "emerald", label: "Emerald", color: "bg-emerald-500" },
    { id: "rose", label: "Rose", color: "bg-rose-500" },
  ];

  const getRingColor = (themeId: Theme) => {
    switch (themeId) {
      case "light":
        return "ring-neutral-400";
      case "dark":
        return "ring-neutral-400";
      case "blue":
        return "ring-blue-600";
      case "indigo":
        return "ring-indigo-600";
      case "emerald":
        return "ring-emerald-600";
      case "rose":
        return "ring-rose-600";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-neutral-500">Theme:</span>
      <div className="flex gap-1">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`h-4 w-4 rounded-full ${t.color} ${
              theme === t.id
                ? `ring-2 ${getRingColor(t.id)} ring-offset-2`
                : `hover:ring-2 ${getRingColor(t.id)} hover:ring-opacity-50 hover:ring-offset-1`
            }`}
            title={t.label}
          />
        ))}
      </div>
    </div>
  );
}
