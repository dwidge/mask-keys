export const maskKeys = (keys: string[], object: object): object =>
  Object.fromEntries(
    Object.entries(object).map(([k, v]) =>
      typeof v === "object" && v !== null
        ? [k, maskKeys(keys, v)]
        : keys.some((key) => k.toLowerCase().includes(key))
          ? [k, maskValue(v)]
          : [k, v]
    )
  );

export const maskValue = (v: any) =>
  v == null ? v : "*".repeat(v?.toString?.().length ?? 1);
