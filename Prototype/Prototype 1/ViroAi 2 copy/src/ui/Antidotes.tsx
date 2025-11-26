const items = [
  { name: "Viroxin-A", eff: 94, status: "Approved", note: "Broad-spectrum antiviral targeting RNA replication" },
  { name: "Immunex-B2", eff: 78, status: "Phase II Trial", note: "Immunomodulator with spike protein inhibition" },
];

export default function Antidotes() {
  return (
    <div className="panel-body">
      {items.map((a) => (
        <div className="list-item" key={a.name}>
          <div>
            <div className="ant-name">{a.name}</div>
            <small>{a.note}</small>
          </div>
          <div className="right">
            <span className="badge info">{a.status}</span>
            <strong>{a.eff}%</strong>
          </div>
        </div>
      ))}
    </div>
  );
}
