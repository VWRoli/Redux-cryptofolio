type Props = {
  clickHandler: () => void;
  label: string;
  icon: React.ReactNode;
};

const Tab: React.FC<Props> = ({ clickHandler, label, icon }): JSX.Element => {
  return (
    <button className="tab" onClick={clickHandler}>
      {icon} <span>{label}</span>
    </button>
  );
};

export default Tab;
