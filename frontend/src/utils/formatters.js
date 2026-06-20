import { format, isPast, parseISO } from "date-fns";

export const formatDate = (date) => (date ? format(parseISO(date), "MMM d, yyyy") : "No date");
export const isOverdue = (date, status) => Boolean(date && status !== "Done" && isPast(parseISO(date)));
export const initials = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
