export const formatTimer = (time: number) => {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  const minStr = min.toString().padStart(2, "0");
  const secStr = sec.toString().padStart(2, "0");
  return `${minStr}:${secStr}`;
};
