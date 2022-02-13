import { Link } from 'react-router-dom';

type Props = {
  label: string;
  primary?: boolean;
  route?: string;
  disabled?: boolean;
  clickHandler?: () => void;
  icon: React.ReactNode;
  fullWidth?: boolean;
  //todo better type
  submitHandler?: any;
};
const Button: React.FC<Props> = ({
  route,
  label,
  primary,
  clickHandler,
  disabled,
  icon,
  fullWidth,
  submitHandler,
}): JSX.Element => {
  const classes = `${primary ? 'btn primary' : 'btn secondary'}`;
  return (
    <button
      style={{ width: fullWidth ? '100%' : 'fit-content' }}
      type="submit"
      disabled={disabled}
      onClick={clickHandler || submitHandler}
      className={classes}
    >
      <Link to={route || '#'}>
        <span>{icon}</span> <span>{label}</span>
      </Link>
    </button>
  );
};

export default Button;
