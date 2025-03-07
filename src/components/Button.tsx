type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

export default function Button(props: Readonly<ButtonProps>) {
  const { children, onClick, disabled } = props;

  return (
    <button
      className="cursor-pointer rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium hover:bg-neutral-900 hover:text-neutral-100"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
