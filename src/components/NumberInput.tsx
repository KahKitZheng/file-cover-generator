import { ChangeEvent } from "react";
import { useTheme } from "../contexts/ThemeContext";

type NumberInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  tabIndex?: number;
  min?: number;
  max?: number;
};

export function NumberInput({
  label,
  value,
  onChange,
  tabIndex,
  min = 1,
  max,
}: NumberInputProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(min, parseInt(e.target.value) || min);
    if (max !== undefined) {
      onChange(Math.min(max, newValue));
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <p>{label}</p>
      <input
        tabIndex={tabIndex}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className={`focus:ring-opacity-50 h-5 w-8 rounded border px-2 py-0.5 text-right transition-colors focus:ring-2 focus:outline-none ${
          isDark
            ? "border-neutral-600 bg-neutral-700 text-neutral-100"
            : "border-neutral-300 bg-white text-neutral-900"
        } ring-[var(--theme-focus-ring)]`}
      />
    </div>
  );
}
