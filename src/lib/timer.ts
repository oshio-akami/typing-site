export const formatTimer = (timeInSeconds: number) => {
  const min = Math.floor(timeInSeconds / 60);
  const sec = timeInSeconds % 60;
  const minStr = min.toString().padStart(2, "0");
  const secStr = sec.toString().padStart(2, "0");
  return `${minStr}分${secStr}秒`;
};
