import { useEffect, useState } from "react";
import { fetchNotifications } from "../api";
import PriorityList from "../components/PriorityList";

const getPriority = (type) => {
  if (type === "Placement") return 3;
  if (type === "Result") return 2;
  return 1;
};

const getTop = (notifications) => {
  return [...notifications]
    .sort((a, b) => {
      const p1 = getPriority(a.Type);
      const p2 = getPriority(b.Type);

      if (p1 !== p2) return p2 - p1;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, 10);
};

export default function Priority() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      // Fetch a larger batch so we can sort and pick top 10
      const res = await fetchNotifications(1, 100);
      const sorted = getTop(res.notifications || []);
      setData(sorted);
      setLoading(false);
    };
    loadAll();
  }, []);

  if (loading) return <p>Loading priority notifications...</p>;

  return (
    <div>
      <h2>Priority Notifications (Top 10)</h2>
      <PriorityList data={data} />
    </div>
  );
}