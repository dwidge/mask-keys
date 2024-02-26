export const maskKeys =
  (cond: (key: string) => boolean) =>
  <T extends object | object[]>(v: T): T => {
    if (Array.isArray(v)) {
      return v.map((v) => maskKeys(cond)(v)) as T;
    } else if (typeof v === "object" && v !== null) {
      // Recurse nested objects
      return Object.fromEntries(
        Object.entries(v).map(([k, v]) =>
          cond(k) ? [k, maskValue(v)] : [k, maskKeys(cond)(v)]
        )
      ) as T;
    } else {
      // Apply masking condition to other values
      return v;
    }
  };

export const maskValue = <T>(v: T) =>
  v == null ? v : "*".repeat(v?.toString?.().length ?? 1);

export const includesAny = (items: string[]) => (value: string) =>
  items.some((key) => value.toLowerCase().includes(key));
