type Props = {
  title: string;
  data: number | string;
};

const DataTag: React.FC<Props> = ({ title, data }): JSX.Element => {
  return (
    <h3 className="data-tag">
      {title} <span>{data}</span>
    </h3>
  );
};

export default DataTag;
