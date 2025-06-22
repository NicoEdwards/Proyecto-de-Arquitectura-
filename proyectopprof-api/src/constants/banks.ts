export const bciBank = {
  id: "bci",
  url: "https://www.bci.cl/beneficios/beneficios-bci",
} as const;

export const chileBank = {
  id: "chile",
  url:
    "https://sitiospublicos.bancochile.cl/personas/beneficios/beneficios-del-dia",
} as const;

export const bankNames = [bciBank.id, chileBank.id] as const;
