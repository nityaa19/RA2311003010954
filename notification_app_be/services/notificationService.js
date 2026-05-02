const Log = require("../../logging_middleware/logger");
const getPriority = require("../utils/priority");

const API_URL = "http://20.207.122.201/evaluation-service/notifications";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJuazE3MDZAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNDIxMywiaWF0IjoxNzc3NzAzMzEzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNzkxM2ZjZjktZDMzNS00NDU1LWIwYmQtMjQ5NDdiZjRhZDk5IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibml0eWFuYW5kIGt1bWFyIiwic3ViIjoiMzUwNThmNmMtZjUzMS00MDFlLWIwNjgtZjJkYTUyNjBiMTU1In0sImVtYWlsIjoibmsxNzA2QHNybWlzdC5lZHUuaW4iLCJuYW1lIjoibml0eWFuYW5kIGt1bWFyIiwicm9sbE5vIjoicmEyMzExMDAzMDEwOTU0IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiMzUwNThmNmMtZjUzMS00MDFlLWIwNjgtZjJkYTUyNjBiMTU1IiwiY2xpZW50U2VjcmV0IjoiWHBZclRtWUdTa2tlc21ubiJ9.aTqWmRdYfavRozHFm_j5XnD1UPze9qcTiv-MhpqJa_4";

const getTopNotifications = async () => {
  try {
    await Log("backend", "info", "service", "Fetching notifications");

    const res = await fetch(API_URL, {
      headers: {
        "Authorization": `Bearer ${TOKEN}`
      }
    });

    const data = await res.json();

    // DEBUG (you can remove later)
    console.log("API DATA:", data);

    const notifications = data.notifications;

    if (!Array.isArray(notifications)) {
      await Log("backend", "error", "service", "Invalid API response");
      throw new Error("Notifications not found");
    }

    await Log("backend", "info", "service", "Sorting notifications");

    notifications.sort((a, b) => {
      const p1 = getPriority(a.Type);
      const p2 = getPriority(b.Type);

      if (p1 !== p2) return p2 - p1;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = notifications.slice(0, 10);

    await Log("backend", "debug", "service", "Top 10 selected");

    return top10;

  } catch (err) {
    await Log("backend", "fatal", "service", "Service failed");
    throw err;
  }
};

module.exports = getTopNotifications;