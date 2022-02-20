type Props = {
  height: number | string;
  width: number | string;
};

const Skeleton: React.FC<Props> = ({ height, width }): JSX.Element => {
  return <div className="skeleton" style={{ height, width }}></div>;
};

export default Skeleton;
