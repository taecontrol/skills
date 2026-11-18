// Spanish catalog for the Precios screen, shaped like src/web/i18n.ts so the
// keys can move into that catalog unchanged.
const es = {
  "prices.title": "Precios",
  "prices.intro": "Elegí un tipo o un producto y mirá dónde conviene comprarlo.",
  "prices.search": "Buscá un tipo o un producto",
  "prices.noMatch": "No hay tipos ni productos con ese nombre.",
  "prices.kinds": "Tipos",
  "prices.products": "Productos",
  "prices.productCount": (count: number) => (count === 1 ? "1 producto" : `${count} productos`),
  "prices.purchaseCount": (count: number) => (count === 1 ? "1 compra" : `${count} compras`),
  "prices.noKind": "sin tipo",
  "prices.change": "Cambiar",
  "prices.changeAria": "Cambiar el tipo o el producto",
  "prices.kindEyebrow": (count: number) =>
    `Tipo · ${count === 1 ? "1 producto" : `${count} productos`}`,
  "prices.productEyebrow": (kind: string) => `Producto · ${kind}`,
  "prices.productNoKind": "Producto · sin tipo",

  "prices.period": "Período",
  "prices.allHistory": "Todo el historial",
  "prices.allHistoryShort": "Historial",
  "prices.periodRange": (from: string, to: string) => `${from} a ${to}`,
  "prices.apply": "Aplicar",
  "prices.chain": "Cadena",
  "prices.allChains": "Todas las cadenas",
  "prices.allChainsShort": "Todas",
  "prices.currency": "Moneda",

  "prices.per.kg": "Por kilo",
  "prices.per.l": "Por litro",
  "prices.per.unit": "Por unidad",
  "prices.suffix.kg": "/kg",
  "prices.suffix.l": "/l",
  "prices.suffix.unit": "/u",
  "prices.unitWord.kg": "kilo",
  "prices.unitWord.l": "litro",
  "prices.unitWord.unit": "unidad",

  "prices.whereTitle": "Dónde conviene",
  "prices.whereCaption.usd": (unit: string) =>
    `Mediana en US$ por ${unit}, de la cadena más barata a la más cara.`,
  "prices.whereCaption.ars": (unit: string) =>
    `Mediana en pesos por ${unit}. El orden sigue a la mediana en US$, de la cadena más barata a la más cara.`,
  "prices.cheapest.usd": "Más barata",
  "prices.cheapest.ars": "Más barata en US$",
  "prices.rank": "Puesto",
  "prices.chainColumn": "Cadena",
  "prices.medianColumn": "Mediana",
  "prices.lowestColumn": "Más baja",
  "prices.latestColumn": "Última compra",
  "prices.lowest": "Más baja",
  "prices.latest": (date: string) => `Última, ${date}`,
  "prices.overall": (count: number) =>
    `Mediana de ${count === 1 ? "la compra" : `las ${count} compras`}`,
  "prices.usdNote": "Los US$ usan el dólar MEP compra del último cierre antes de cada compra.",
  "prices.withoutRate": (dates: readonly string[]) =>
    dates.length === 1
      ? `La compra del ${dates[0]} no tiene cotización del dólar. Figura solo en pesos y queda fuera de las cifras en US$.`
      : `Las compras del ${dates.slice(0, -1).join(", ")} y del ${dates.at(-1)} no tienen cotización del dólar. Figuran solo en pesos y quedan fuera de las cifras en US$.`,

  "prices.dealsTitle": "Mejores compras",
  "prices.dealsCaption.usd": (unit: string, median: string) =>
    `Las compras más baratas por ${unit}, contra la mediana de ${median}.`,
  "prices.dealsCaption.ars": (unit: string, median: string) =>
    `Las compras más baratas por ${unit}. El orden y el porcentaje siguen al precio en US$. La mediana en pesos es ${median}.`,
  "prices.below": (percent: number) => `${percent} % bajo la mediana`,
  "prices.above": (percent: number) => `${percent} % sobre la mediana`,
  "prices.atMedian": "En la mediana",
  "prices.dateColumn": "Fecha",
  "prices.productColumn": "Producto",
  "prices.vsMedianColumn": "Contra la mediana",
  "prices.priceColumn": (unit: string) => `Por ${unit}`,

  "prices.historyShow": (count: number) =>
    count === 1 ? "Ver la compra" : `Ver las ${count} compras`,
  "prices.historyHide": "Ocultar las compras",
  "prices.historyTitle": "Todas las compras, de la más nueva a la más vieja",
  "prices.paidColumn": "Pagado",
  "prices.rateColumn": "MEP compra",
  "prices.paid": (amount: string) => `pagado ${amount}`,
  "prices.rate": (rate: string) => `MEP ${rate}`,
  "prices.noRate": "sin cotización",

  "prices.withoutSizeTitle": "Sin tamaño ni peso",
  "prices.withoutSizeCaption":
    "Estas compras quedan fuera de la comparación. El producto no tiene tamaño y no se pesó, así que no hay precio por kilo, litro ni unidad. Figura lo que se pagó.",
  "prices.withoutSizeOnly": (name: string) =>
    `Ninguna compra de ${name} tiene tamaño ni peso, así que no hay precio por kilo, litro ni unidad y no hay nada que comparar. Figura lo que se pagó.`,
  "prices.noPurchasesTitle": "Sin compras en este período",
  "prices.noPurchasesDescription": (name: string, from: string, to: string) =>
    `No hay compras de ${name} entre el ${from} y el ${to}.`,
  "prices.changePeriod": "Cambiar el período",
  "prices.loading": "Cargando precios…",

  "error.offline": "Sin conexión con Despensa. Revisá tu conexión a internet.",
  "error.retry": "Reintentar",
  "error.retrying": "Reintentando…",
} as const;

export type MessageKey = keyof typeof es;
type Args<K extends MessageKey> = (typeof es)[K] extends (...args: infer A) => string ? A : [];

export const t = <K extends MessageKey>(key: K, ...args: Args<K>): string => {
  const message = es[key];
  return typeof message === "function"
    ? (message as unknown as (...values: Args<K>) => string)(...args)
    : message;
};
