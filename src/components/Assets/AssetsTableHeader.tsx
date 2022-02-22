const AssetsTableHeader: React.FC = (): JSX.Element => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th className="percentage-change-row">24H</th>
        <th>Holdings</th>
        <th className="profit-row">Profit/Loss</th>
        <th className="actions-row">Actions</th>
      </tr>
    </thead>
  );
};

export default AssetsTableHeader;
