export const firstLetterToUpperCase = str => {
  return str.split('')[0].toUpperCase() + str.substring(1)
}

export const convertSeconds = seconds => {
  let convertedSeconds = (seconds % 60).toString();
  let minutes = Math.floor(seconds / 60).toString();
  let hours = Math.floor(minutes / 60).toString();

  if (minutes > 59) minutes = (minutes % 60).toString()

  if (convertedSeconds.length === 1) convertedSeconds = `0${convertedSeconds}`;
  if (minutes.length === 1) minutes = `0${minutes}`;
  if (hours.length === 1) hours = `0${hours}`;

  return `${hours}:${minutes}:${convertedSeconds}`
}