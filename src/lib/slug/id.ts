import slugify from "slugify";

function toBaseSlug(value: string) {
  return slugify(value, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export function toKebabId(value: string | undefined, fallback: string, defaultValue: string) {
  const direct = toBaseSlug(value ?? "");
  if (direct) {
    return direct;
  }

  const fallbackSlug = toBaseSlug(fallback);
  if (fallbackSlug) {
    return fallbackSlug;
  }

  return defaultValue;
}

export function toSnakeId(value: string | undefined, fallback: string, defaultValue: string) {
  return toKebabId(value, fallback, defaultValue).replace(/-/g, "_");
}
