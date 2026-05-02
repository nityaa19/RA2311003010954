const getTopNotifications = require("./services/notificationService");
const Log = require("../logging_middleware/logger");

const main = async () => {
  try {
    await Log("backend", "info", "route", "Stage 1 started");

    const result = await getTopNotifications();

    console.log("Top 10 Notifications:");
    console.log(result);

    await Log("backend", "info", "route", "Stage 1 completed");

  } catch (err) {
    await Log("backend", "fatal", "route", "Application crashed");
    console.error(err);
  }
};

main();