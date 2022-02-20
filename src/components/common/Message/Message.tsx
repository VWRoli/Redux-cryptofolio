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
};

const Message: React.FC<Props> = ({ msg, role }): JSX.Element => {
  const classes = `msg ${role === roleType.ERROR && 'error'} ${
    role === roleType.SUCCESS && 'success'
  } ${role === roleType.INFO && 'info'}`;
  return <p className={classes}>{msg}</p>;
};

export default Message;
