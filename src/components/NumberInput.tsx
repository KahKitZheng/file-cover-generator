import { ChangeEvent } from "react";

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
        className="h-5 w-8 rounded border border-neutral-300 px-2 py-0.5 text-right focus:outline-2 focus:outline-neutral-400"
      />
    </div>
  );
}
