const data = [
  { id: "MUT–2024–001", text: "Spike protein modification affecting ACE2 binding", prob: 87, risk: "High Risk" },
  { id: "MUT–2024–002", text: "RNA polymerase efficiency enhancement", prob: 64, risk: "Medium Risk" },
  { id: "MUT–2024–003", text: "Membrane flexibility alteration", prob: 32, risk: "Low Risk" },
];

export default function Predictions() {
  return (
    <div className="panel-body">
      {data.map((item) => (
        <div className="list-item" key={item.id}>
          <div>
            <div className="mut-id">{item.id}</div>
            <div className="mut-text">{item.text}</div>
            <small>Probability</small>
          </div>
          <div className="right">
            <span className={`badge ${item.risk.toLowerCase().split(" ")[0]}`}>{item.risk}</span>
            <strong>{item.prob}%</strong>
          </div>
        </div>
      ))}
    </div>
  );
}
