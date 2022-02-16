import { Link } from 'react-router-dom';

type Props = {
  label: string;
  primary?: boolean;
  route?: string;
  disabled?: boolean;
  clickHandler?: any; //todo
  icon: React.ReactNode;
  fullWidth?: boolean;
  form?: string;
};
const Button: React.FC<Props> = ({
  route,
  label,
  primary,
  clickHandler,
  disabled,
  icon,
  fullWidth,
  form,
}): JSX.Element => {
  const classes = `${primary ? 'btn primary' : 'btn secondary'}`;
  return (
    <button
      form={form}
      style={{ width: fullWidth ? '100%' : 'fit-content' }}
      type="submit"
      disabled={disabled}
      onClick={clickHandler}
      className={classes}
    >
      <Link to={route || '#'}>
        <span>{icon}</span> <span>{label}</span>
      </Link>
    </button>
  );
};

export default Button;
