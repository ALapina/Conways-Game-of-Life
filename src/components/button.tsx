type Props = {
  disabled?: boolean;
  icon: string;
  name: string;
  onClick: () => void;
  size?: 'md' | 'lg';
};

export const Button = ({disabled, onClick, name, icon, size = 'md'}: Props) => {
  return (
    <button
      disabled={disabled && disabled}
      className={`disabled:opacity-50 transition-all flex border border-primaryGreen min-w-32 items-center ${
        size === 'lg' ? 'h-14' : 'h-8'
      }`}
      onClick={onClick}
    >
      <span
        className={
          'w-8 justify-center bg-primaryGreen text-black flex h-full items-center'
        }
      >
        {icon}
      </span>
      <span className={'flex w-full justify-center px-2'}>{name}</span>
    </button>
  );
};
