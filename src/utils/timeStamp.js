export default function timeStamp(time) {
  const CreationTime = new Date(time);

  // Current time
  const currentTime = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = currentTime - CreationTime;

  // Convert the difference to a readable format
  const millisecondsInHour = 60 * 60 * 1000;
  const hours = Math.floor(timeDifference / millisecondsInHour);
  const minutes = Math.floor(
    (timeDifference % millisecondsInHour) / (60 * 1000)
  );
  const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);
  // Convert the difference to weeks
  const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
  const weeks = Math.floor(timeDifference / millisecondsInWeek);

  if (weeks) {
    return { weeks };
  } else if (hours) {
    return { hours };
  } else if (minutes) {
    return { minutes };
  } else if (seconds) {
    return { seconds };
  } else {
    return { seconds: 1 };
  }
}
