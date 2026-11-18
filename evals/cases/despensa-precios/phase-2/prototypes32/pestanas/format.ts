import { NOW, type ProductRef, type Size } from "./data.ts";

const BA = "America/Argentina/Buenos_Aires";
const shortDate = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "short", timeZone: "UTC" });
const baDay = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "short", timeZone: BA });
const baKey = new Intl.DateTimeFormat("en-CA", { timeZone: BA });
const baTime = new Intl.DateTimeFormat("es-AR", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: BA,
});
const decimal = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 3 });

/** "28 oct" */
export const formatDay = (isoDate: string) =>
  shortDate.format(new Date(`${isoDate}T00:00:00Z`)).replaceAll(".", "");

/** "hoy a las 14:05" or "el 20 oct a las 18:42", in Buenos Aires time. */
export const formatWhen = (iso: string) => {
  const date = new Date(iso);
  const time = baTime.format(date);
  return baKey.format(date) === baKey.format(new Date(NOW))
    ? `hoy a las ${time}`
    : `el ${baDay.format(date).replaceAll(".", "")} a las ${time}`;
};

/** 1000 g reads "1 kg", 2000 ml "2 l", units "4 u.". */
export const formatSize = (size: Size | null) => {
  if (!size) return null;
  if (size.unit === "unit") return `${decimal.format(size.amount)} u.`;
  const big = size.amount >= 1000;
  const amount = decimal.format(big ? size.amount / 1000 : size.amount);
  return size.unit === "g" ? `${amount} ${big ? "kg" : "g"}` : `${amount} ${big ? "l" : "ml"}`;
};

export const purchasesText = (n: number) =>
  n === 0 ? "Sin compras" : n === 1 ? "1 compra" : `${n} compras`;

export const brandAndSize = (product: ProductRef) =>
  [product.brand, formatSize(product.size)].filter(Boolean).join(" · ");
