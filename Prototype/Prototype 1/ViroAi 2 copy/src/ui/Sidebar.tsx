const items = [
  { icon: "📊", label: "Dashboard", id: "dashboard" },
  { icon: "🧬", label: "Mutations", id: "mutations" },
  { icon: "💊", label: "Antidotes", id: "antidotes" },
  { icon: "📚", label: "Research", id: "research" },
  { icon: "🧭", label: "Visualizations", id: "visualizations" },
  { icon: "📑", label: "Reports", id: "reports" },
  { icon: "🤖", label: "Chatbot", id: "chatbot" },
];

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">Viro AI</div>
      <nav>
        {items.map((it) => (
          <button 
            key={it.id} 
            className={`nav-item ${activeSection === it.id ? "active" : ""}`}
            onClick={() => onSectionChange(it.id)}
          >
            <span>{it.icon}</span>
            {it.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
