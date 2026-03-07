import slugify from "slugify";

function toBaseSlug(value: string) {
  // Replace underscores with hyphens before slugifying so they become valid separators.
  const normalized = value.replace(/_/g, "-");
  return slugify(normalized, {
    lower: true,
    strict: true,
    trim: true,
  });
}

function isValidKebab(value: string) {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value);
}

function isValidSnake(value: string) {
  return /^[a-z0-9]+(_[a-z0-9]+)*$/.test(value);
}

export function toKebabId(value: string | undefined, fallback: string, defaultValue: string) {
  if (value && isValidKebab(value)) {
    return value;
  }
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
  if (value && isValidSnake(value)) {
    return value;
  }
  return toKebabId(value, fallback, defaultValue).replace(/-/g, "_");
}
