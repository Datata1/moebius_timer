export enum MoebiusTheme {
  ASTRONAUT = "astronaut",
}

export interface Moebius {
  countdown: number;
  heatUp: boolean;
  endDate: string;
  timezone: string;
  debug: boolean;
  theme: MoebiusTheme;
}
