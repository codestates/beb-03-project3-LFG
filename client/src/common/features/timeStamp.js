export const timeStamp = (startAt, period) => {
  const leftSeconds = parseInt(((startAt + period) * 1000 - Date.now()) / 1000);

  const seconds = Math.floor(leftSeconds % 60);
  const minutes = Math.floor((leftSeconds / 60) % 60);
  const hours = Math.floor((leftSeconds / (60 * 60)) % 60);
  const days = Math.floor(leftSeconds / (60 * 60 * 24));

  //   if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
  //     return false;
  //   }

  if (days === 0) {
    return `${hours}h : ${minutes}m : ${seconds}s`;
  } else {
    return `${days}d : ${hours}h : ${minutes}m`;
  }
};
