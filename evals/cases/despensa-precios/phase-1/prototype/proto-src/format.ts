// es-AR presentation of figures exactly as compare_prices returns them.
// Nothing here recomputes a price, a median, an order or a percentage.

const ars = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" });
const usd = new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD" });
const quantity = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 3 });
const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export const formatArs = (amount: number): string => ars.format(amount);
export const formatUsd = (amount: number): string => usd.format(amount);

/** "1 nov 2026" */
export const formatDate = (iso: string): string => {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${months[(month ?? 1) - 1]} ${year}`;
};

/** "2 kg", "0,27 kg", "20 u" */
export const formatMeasure = (amount: number, unit: "kg" | "l" | "unit"): string =>
  `${quantity.format(amount)} ${unit === "unit" ? "u" : unit}`;
