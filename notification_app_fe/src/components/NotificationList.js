export default function NotificationList({ data }) {
  return (
    <div>
      {data.map((n) => (
        <div key={n.ID}>
          <strong>{n.Type}</strong>
          <p>{n.Message}</p>
        </div>
      ))}
    </div>
  );
}