type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

export default function Button(props: Readonly<ButtonProps>) {
  const { children, onClick, disabled } = props;

  return (
    <button
      className="cursor-pointer rounded-lg border border-neutral-200 bg-neutral-900 px-3 py-2 text-xs font-semibold text-neutral-100 hover:bg-neutral-600"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
