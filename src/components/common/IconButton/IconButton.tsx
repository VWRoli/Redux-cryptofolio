type Props = {
  icon: React.ReactNode;
  clickHandler: () => void;
  primary?: boolean;
};

const IconButton: React.FC<Props> = ({
  icon,
  clickHandler,
  primary,
}): JSX.Element => {
  return (
    <button
      type="button"
      className={primary ? 'primary-icon-btn' : 'secondary-icon-btn'}
      onClick={clickHandler}
    >
      {icon}
    </button>
  );
};

export default IconButton;
