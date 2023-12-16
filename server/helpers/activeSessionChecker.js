const isToday = (date) => {
  const currentDate = new Date();
  return date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
};
// Helper function to check if a date is within the last 7 days
function isWithinLast7Days() {
  var currentDate = new Date();

  // Subtract 7 days to get the last 7 days
  var sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  return sevenDaysAgo;
}
const activeSessionChecker = (userActiveSession) => {
  let haveLogin = false;

  userActiveSession.forEach((user) => {
    user.UserHistories.forEach((report) => {
      let allLoginDate = new Date(report.createdAt);

      // Check if the login date is today
      if (allLoginDate.toDateString() === new Date().toDateString()) {
        haveLogin = true;
      }
    });
  });
  return haveLogin;
};
// Helper function to count today's active sessions for a user
const countTodayActiveSessions = (user) => {
  let todayActiveSession = 0;

  user.forEach((userData) => {
    userData.UserHistories.forEach((history) => {
      if (history.name === "activeSession" && isToday(new Date(history.createdAt))) {
        todayActiveSession++;
      }
    });
  });

  return todayActiveSession;
};

function countAverageActiveSessionsLast7Days(user) {
  var sevenDaysAgo = isWithinLast7Days();

  var activeSessionData = [];

  user.forEach((userData) => {
    activeSessionData = activeSessionData.concat(
      userData.UserHistories.filter(
        (history) => history.name === "activeSession" && new Date(history.createdAt) >= sevenDaysAgo && new Date(history.createdAt) <= new Date()
      )
    );
  });

  var totalAverageActiveSession = activeSessionData.length / 7;
  return totalAverageActiveSession;
}
module.exports = { activeSessionChecker, countTodayActiveSessions, countAverageActiveSessionsLast7Days };
