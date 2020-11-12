export default runtime => {
  if (!runtime) return;
  const hours = parseInt(runtime / 60);
  runtime %= 60;
  const minutes = parseInt(runtime / 60);
  const seconds = runtime % 60;
  return `${hours > 0 ? hours + ' hours' : ''} ${
    minutes > 0 ? minutes + ' minutes' : ''
  } ${seconds > 0 ? seconds + ' seconds' : ''}`;
};
