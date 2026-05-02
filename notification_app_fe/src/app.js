import Home from "./pages/Home";
import Priority from "./pages/Priority";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ padding: 20 }}>
      <h1>Campus Notifications</h1>

      <button onClick={() => setPage("home")}>All</button>
      <button onClick={() => setPage("priority")}>Priority</button>

      {page === "home" ? <Home /> : <Priority />}
    </div>
  );
}

export default App;