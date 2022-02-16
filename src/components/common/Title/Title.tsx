type Props = {
  title: string;
  h2?: boolean;
};

const Title: React.FC<Props> = ({ title, h2 }): JSX.Element => {
  return (
    <>
      {h2 ? (
        <h2 className="title h2">{title}</h2>
      ) : (
        <h1 className="title h1">{title}</h1>
      )}
    </>
  );
};

export default Title;
