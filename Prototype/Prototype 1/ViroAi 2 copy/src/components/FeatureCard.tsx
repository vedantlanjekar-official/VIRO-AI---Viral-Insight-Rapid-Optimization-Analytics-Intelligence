export default function FeatureCard({ title, text, icon }: { title: string; text: string; icon?: string }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon ?? "🔹"}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}
