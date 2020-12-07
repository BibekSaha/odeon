export default runtime => {
  // runtime will be in minutes
  runtime *= 60; // runtime is now in seconds
  const hours = parseInt(runtime / 3600);
  runtime -= 3600 * hours;
  const minutes = parseInt(runtime / 60);
  const seconds = runtime - 60 * minutes;

  const hourString =
    hours > 0 ? (hours > 1 ? hours + ' hours' : hours + ' hour') : '';
  const minuteString =
    minutes > 0
      ? minutes > 1
        ? ' ' + minutes + ' minutes'
        : ' ' + minutes + ' minute'
      : '';
  const secondString =
    seconds > 0
      ? seconds > 1
        ? ' ' + seconds + ' seconds'
        : ' ' + seconds + ' second'
      : '';

  return `${hourString}${minuteString}${secondString}`;
};
