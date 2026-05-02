const PRIORITY_LABELS = {
  3: { label: "HIGH", color: "#d32f2f" },
  2: { label: "MEDIUM", color: "#f57c00" },
  1: { label: "LOW", color: "#388e3c" },
};

const getPriority = (type) => {
  if (type === "Placement") return 3;
  if (type === "Result") return 2;
  return 1;
};

export default function PriorityList({ data }) {
  if (!data || data.length === 0) {
    return <p>No priority notifications found.</p>;
  }

  return (
    <div>
      {data.map((n) => {
        const priority = getPriority(n.Type);
        const { label, color } = PRIORITY_LABELS[priority];

        return (
          <div
            key={n.ID}
            style={{
              border: `2px solid ${color}`,
              borderRadius: 8,
              padding: "10px 16px",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ color }}>[{label}] {n.Type}</strong>
              <small style={{ color: "#888" }}>{new Date(n.Timestamp).toLocaleString()}</small>
            </div>
            <p style={{ margin: "6px 0 0" }}>{n.Message}</p>
          </div>
        );
      })}
    </div>
  );
}
