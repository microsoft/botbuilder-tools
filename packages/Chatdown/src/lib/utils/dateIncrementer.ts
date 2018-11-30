let now = Date.now();
now -= now % 1000; // nearest second

export const messageTimeGap = 2000;

export function getIncrementedDate(byThisAmount: number = messageTimeGap): Date {
  return new Date(now += byThisAmount);
}

export function setStaticDate(date: Date): void {
  now = date.getTime();
}
