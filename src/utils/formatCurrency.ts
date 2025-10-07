export function formatCurrency(value: number | string | undefined): string {
  if (!value) return "0 đ";

  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0 đ";

  return `${num.toLocaleString("vi-VN")} đ`;
}

export function formatDiscount(
  price?: number | string,
  compareAtPrice?: number | string
): string {
  if (!price || !compareAtPrice) return "";

  const current = Number(price);
  const original = Number(compareAtPrice);

  if (!original || original <= current) return "";

  const percent = Math.round(((original - current) / original) * 100);
  return `-${percent}%`;
}