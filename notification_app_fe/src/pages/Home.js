import { useEffect, useState } from "react";
import { fetchNotifications } from "../api";
import NotificationList from "../components/NotificationList";
import FilterBar from "../components/FilterBar";

export default function Home() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");

  useEffect(() => {
    loadData();
  }, [type]);

  const loadData = async () => {
    const res = await fetchNotifications(1, 10, type);
    setData(res.notifications || []);
  };

  return (
    <div>
      <h2>All Notifications</h2>
      <FilterBar setType={setType} />
      <NotificationList data={data} />
    </div>
  );
}