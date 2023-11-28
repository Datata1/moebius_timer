export type DHMS = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  raw: number;
};

export const useFormatSecondsToDHMS = () => {
  const format = (seconds: number, addLeadingZero = true): DHMS => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return {
      days: padZero(days, addLeadingZero),
      hours: padZero(hours, addLeadingZero),
      minutes: padZero(minutes, addLeadingZero),
      seconds: padZero(remainingSeconds, addLeadingZero),
      raw: seconds,
    };
  };

  const padZero = (num: number, addLeadingZero: boolean): string => {
    return addLeadingZero && num < 10 ? `0${num}` : `${num}`;
  };

  return format;
};
