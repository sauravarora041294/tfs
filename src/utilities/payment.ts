const transformCardNumberInput = (
  e: React.FormEvent<HTMLInputElement>,
): string => {
  const cardNumberInput = (e.target as HTMLInputElement).value;

  const cardNumberSanitized = cardNumberInput.replace(/\s|-/g, "").split("");

  const transformedCardNumber: string = cardNumberSanitized.reduce(
    (accumulated, char, idx) => {
      if (idx % 4 === 0 && idx !== 0) accumulated += " ";
      return (accumulated += char);
    },
    "",
  );

  return transformedCardNumber;
};

export { transformCardNumberInput };
