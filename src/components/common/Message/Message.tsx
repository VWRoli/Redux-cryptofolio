/* eslint-disable no-unused-vars */
export enum roleType {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
}
/* eslint-disable */

type Props = {
  msg: string;
  role: roleType;
  small?: boolean;
};

const Message: React.FC<Props> = ({ msg, role, small }): JSX.Element => {
  const classes = `msg ${role === roleType.ERROR && 'error'} ${
    role === roleType.SUCCESS && 'success'
  } ${role === roleType.INFO && 'info'}`;
  return (
    <p className={classes} style={{ fontSize: small ? '.87rem' : '1rem' }}>
      {msg}
    </p>
  );
};

export default Message;
