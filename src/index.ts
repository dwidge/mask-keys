export const maskKeys =
  (cond: (key: string) => boolean) =>
  <T extends object>(object: T): T =>
    Object.fromEntries(
      Object.entries(object).map(([k, v]) =>
        typeof v === "object" && v !== null
          ? [k, maskKeys(cond)(v)]
          : cond(k)
          ? [k, maskValue(v)]
          : [k, v]
      )
    ) as T;

export const maskValue = <T>(v: T) =>
  v == null ? v : "*".repeat(v?.toString?.().length ?? 1);

export const includesAny = (items: string[]) => (value: string) =>
  items.some((key) => value.toLowerCase().includes(key));
