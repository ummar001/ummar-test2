interface IFormatPriceProps {
  symbol: string | undefined
  price: number
}

export const formatPrice = ({ symbol, price }: IFormatPriceProps) => {
  // Convert the total string to a floating-point number

  // Check if the price is a valid number
  if (symbol === undefined) {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  if (isNaN(price)) {
    return "Invalid Price";
  }

  // Format the price to 2 decimal places with the symbol
  const formattedPrice = price.toLocaleString(undefined, {
    style: "currency",
    currency: symbol,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedPrice;
};
