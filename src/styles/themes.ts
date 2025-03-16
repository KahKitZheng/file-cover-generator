import type { Theme } from "../contexts/ThemeContext";

type ThemeStyle = {
  mainBg: string;
  containerBg: string;
  shadow: string;
  text: string;
  activeState: string;
  hoverState: string;
  accentState: string;
  focusRing: string;
  outline: string;
};

export const themeStyles: Record<Theme, ThemeStyle> = {
  light: {
    mainBg: "bg-neutral-50",
    containerBg: "bg-white",
    shadow: "shadow-[0_0_10px_rgba(0,0,0,0.1)]",
    text: "text-neutral-900",
    activeState: "#e5e5e5",
    hoverState: "#f5f5f5",
    accentState: "#d4d4d4",
    focusRing: "#a3a3a3",
    outline: "outline-neutral-400",
  },
  dark: {
    mainBg: "bg-neutral-900",
    containerBg: "bg-neutral-800",
    shadow: "shadow-[0_0_10px_rgba(0,0,0,0.3)]",
    text: "text-neutral-100",
    activeState: "#404040",
    hoverState: "#404040",
    accentState: "#525252",
    focusRing: "#525252",
    outline: "outline-neutral-600",
  },
  blue: {
    mainBg: "bg-blue-100",
    containerBg: "bg-white",
    shadow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    text: "text-neutral-900",
    activeState: "#dbeafe",
    hoverState: "#eff6ff",
    accentState: "#bfdbfe",
    focusRing: "#60a5fa",
    outline: "outline-blue-400",
  },
  indigo: {
    mainBg: "bg-indigo-100",
    containerBg: "bg-white",
    shadow: "shadow-[0_0_15px_rgba(99,102,241,0.3)]",
    text: "text-neutral-900",
    activeState: "#e0e7ff",
    hoverState: "#eef2ff",
    accentState: "#c7d2fe",
    focusRing: "#818cf8",
    outline: "outline-indigo-400",
  },
  emerald: {
    mainBg: "bg-emerald-100",
    containerBg: "bg-white",
    shadow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    text: "text-neutral-900",
    activeState: "#d1fae5",
    hoverState: "#ecfdf5",
    accentState: "#a7f3d0",
    focusRing: "#34d399",
    outline: "outline-emerald-400",
  },
  rose: {
    mainBg: "bg-rose-100",
    containerBg: "bg-white",
    shadow: "shadow-[0_0_15px_rgba(244,63,94,0.3)]",
    text: "text-neutral-900",
    activeState: "#ffe4e6",
    hoverState: "#fff1f2",
    accentState: "#fecdd3",
    focusRing: "#fb7185",
    outline: "outline-rose-400",
  },
};
