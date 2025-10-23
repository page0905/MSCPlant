const DEFAULT_LOCALE = "en-US";
const DEFAULT_CURRENCY = "USD";

let cachedFormatterKey = "";
let cachedFormatter = null;

const getFormatter = (locale = DEFAULT_LOCALE, currency = DEFAULT_CURRENCY) => {
  const key = `${locale}|${currency}`;
  if (!cachedFormatter || cachedFormatterKey !== key) {
    cachedFormatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    });
    cachedFormatterKey = key;
  }
  return cachedFormatter;
};

export const parsePriceToNumber = (value) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value !== "string") {
    return 0;
  }

  const sanitized = value.replace(/[^0-9.,-]/g, "").replace(/,/g, "");
  const parsed = parseFloat(sanitized);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const formatCurrency = (
  value,
  { locale = DEFAULT_LOCALE, currency = DEFAULT_CURRENCY } = {}
) => {
  const numberValue = Number(value);
  const formatter = getFormatter(locale, currency);
  if (!Number.isFinite(numberValue)) {
    return formatter.format(0);
  }
  return formatter.format(numberValue);
};

export const normalizePriceFields = (item) => {
  const priceValue = parsePriceToNumber(item?.priceValue ?? item?.cost);
  const stockValue = Number.parseInt(item?.stock, 10);
  const normalizedStock =
    Number.isFinite(stockValue) && stockValue >= 0 ? stockValue : null;

  return {
    ...item,
    priceValue,
    cost: item?.cost ?? formatCurrency(priceValue),
    stock: normalizedStock,
  };
};
