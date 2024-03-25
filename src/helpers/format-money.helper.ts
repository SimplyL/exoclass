export const formatMoney = (amount: number, currency: string) =>
  new Intl.NumberFormat('no-No', {
    style: 'currency',
    currency: currency || 'EUR',
  }).format(amount);
