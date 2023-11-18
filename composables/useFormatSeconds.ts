export type DHMS = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  raw: number;
};

export const useFormatSecondsToDHMS = () => {
  const format = (seconds: number): DHMS => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return {
      days: padZero(days),
      hours: padZero(hours),
      minutes: padZero(minutes),
      seconds: padZero(remainingSeconds),
      raw: seconds,
    };
  };

  const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return format;
};
