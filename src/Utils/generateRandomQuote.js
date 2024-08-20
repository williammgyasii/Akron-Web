export const getRandomQuotes = async () => {
  const quoteResult = fetch("https://type.fit/api/quotes", { mode: "no-cors" })
    .then((response) => response.json())
    .then((data) => {
      const randomFormula = data[Math.floor(Math.random() * (data.length - 2))];
      const quotes = `${randomFormula?.text} - ${randomFormula?.author
        .split(",")
        .splice(0, 1)
        .join("")}`;

      return quotes;
    })
    .catch((error) => console.error("Error fetching quotes:", error));

  return quoteResult;
};
