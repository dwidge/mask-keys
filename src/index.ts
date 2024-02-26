export const maskKeys =
  (cond: (key: string) => boolean) =>
  <T extends object>(object: T): T =>
    Object.fromEntries(
      Object.entries(object).map(([k, v]) => {
        if (Array.isArray(v)) {
          // Iterate arrays
          return [k, v.map((v) => maskKeys(cond)(v))];
        } else if (typeof v === "object" && v !== null) {
          // Recurse nested objects
          return [k, maskKeys(cond)(v)];
        } else {
          // Apply masking condition to other values
          return cond(k) ? [k, maskValue(v)] : [k, v];
        }
      })
    ) as T;

export const maskValue = <T>(v: T) =>
  v == null ? v : "*".repeat(v?.toString?.().length ?? 1);

export const includesAny = (items: string[]) => (value: string) =>
  items.some((key) => value.toLowerCase().includes(key));
