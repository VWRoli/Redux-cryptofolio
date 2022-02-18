type Props = {
  title: string;
  h2?: boolean;
};

const Title: React.FC<Props> = ({ title, h2, children }): JSX.Element => {
  return (
    <>
      {h2 ? (
        <h2 className="title h2">
          {title}
          {children}
        </h2>
      ) : (
        <h1 className="title h1">
          {title}
          {children}
        </h1>
      )}
    </>
  );
};

export default Title;
