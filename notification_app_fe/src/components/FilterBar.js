export default function FilterBar({ setType }) {
  return (
    <div>
      <button onClick={() => setType("")}>All</button>
      <button onClick={() => setType("Event")}>Event</button>
      <button onClick={() => setType("Result")}>Result</button>
      <button onClick={() => setType("Placement")}>Placement</button>
    </div>
  );
}