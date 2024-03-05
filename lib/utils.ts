import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const COLOR = [
  "#0000FF",
  "#008000",
  "#987359",
  "#FFFF00",
  "#FF0000",
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function connectionIdToColor(connectionId: number): string {
  return COLOR[connectionId % COLOR.length]
}