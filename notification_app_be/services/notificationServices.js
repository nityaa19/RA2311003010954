const fetch = require("node-fetch");
const Log = require("../../logging_middleware/logger");
const getPriority = require("../utils/priority");

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

const getTopNotifications = async () => {
  try {
    await Log("backend", "info", "service", "Fetching notifications");

    const res = await fetch(API_URL);
    const data = await res.json();

    const notifications = data.notifications;

    await Log("backend", "info", "service", "Applying sorting logic");

    notifications.sort((a, b) => {
      const p1 = getPriority(a.Type);
      const p2 = getPriority(b.Type);

      if (p1 !== p2) return p2 - p1;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = notifications.slice(0, 10);

    await Log("backend", "debug", "service", "Top 10 notifications selected");

    return top10;

  } catch (err) {
    await Log("backend", "error", "service", "Error processing notifications");
    throw err;
  }
};

module.exports = getTopNotifications;