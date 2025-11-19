export default function VirusInfo() {
  return (
    <div className="panel-body">
      <h3>SARS-CoV-2 Delta Variant</h3>
      <p className="sub">Severe Acute Respiratory Syndrome Coronavirus 2</p>
      <div className="info-grid">
        <div className="chip">Genome Type<br /><strong>Positive-sense RNA</strong></div>
        <div className="chip danger">Severity<br /><strong>High</strong></div>
      </div>
      <div className="tags">
        <span className="tag">Spike (S)</span>
        <span className="tag">Nucleocapsid (N)</span>
        <span className="tag">Membrane (M)</span>
        <span className="tag">Envelope (E)</span>
      </div>
      <ul className="details">
        <li>Enhanced transmissibility (60% more contagious)</li>
        <li>L452R and P681R mutations in spike protein</li>
        <li>Increased viral load and shedding duration</li>
        <li>Partial immune escape capabilities</li>
      </ul>
    </div>
  );
}
