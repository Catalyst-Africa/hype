import { STREAK_DURATION } from "./config";

export const extractErrorMessage = (errorString) => {
  const errorMessageRegex = /Firebase: Error \((.+)\)./;
  const errorMessageMatch =
    JSON.stringify(errorString).match(errorMessageRegex);
  if (errorMessageMatch && errorMessageMatch.length > 1) {
    let errorMessage = errorMessageMatch[1];
    const prefixIndex = errorMessage.indexOf("/");
    errorMessage = errorMessage.slice(prefixIndex + 1);
    errorMessage = errorMessage.replace(/-/g, " ");
    errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
    return errorMessage;
  }
  return null;
};

export const updateStreak = (streak, lastInvokedTime) => {
  let cstreak = streak;
  const now = new Date().getTime();

  console.log(cstreak, lastInvokedTime);

  if (
    !lastInvokedTime ||
    lastInvokedTime === 0 ||
    now > lastInvokedTime + STREAK_DURATION * 2
  ) {
    lastInvokedTime = now;
    cstreak = 1;
    console.log(lastInvokedTime);
  } else if (now < lastInvokedTime + STREAK_DURATION) {
    console.log(lastInvokedTime, streak);
    return cstreak;
  } else if (
    now > lastInvokedTime + STREAK_DURATION &&
    now < lastInvokedTime + STREAK_DURATION * 2
  ) {
    cstreak++;
    lastInvokedTime = now;
    console.log(cstreak, lastInvokedTime);
  }

  console.log(lastInvokedTime);
  return {
    cstreak,
    lastInvokedTime,
  };
};
