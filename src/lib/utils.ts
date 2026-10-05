export { clsx as cn } from "clsx";

export function formatDate(iso: string, options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", ...options }).format(new Date(iso));
}

export function dateParts(iso: string) {
  return {
    day: formatDate(iso, { day: "2-digit" }),
    month: formatDate(iso, { month: "short" }),
    weekday: formatDate(iso, { weekday: "long" }),
  };
}
