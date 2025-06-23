export const formatNumber = (num: number, precision: number): string => {
  if (isNaN(num)) return "";
  return Number(num.toFixed(precision)).toLocaleString("en-US", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
};
