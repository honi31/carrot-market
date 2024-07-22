export function formatToWon(price: number): string {
  return price.toLocaleString("ko-KR");
}

export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime(); //string을 받아서 Date 오브젝트로 변환
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);
  const formatter = new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff, "days");
}
