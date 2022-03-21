type Props = {
  icon: React.ReactNode;
  clickHandler: (e: React.FormEvent | React.MouseEvent) => void;
  primary?: boolean;
  ariaLabel: string;
};

const IconButton: React.FC<Props> = ({
  icon,
  clickHandler,
  primary,
  ariaLabel,
}): JSX.Element => {
  return (
    <button
      type="button"
      className={primary ? 'primary-icon-btn' : 'secondary-icon-btn'}
      onClick={clickHandler}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default IconButton;
