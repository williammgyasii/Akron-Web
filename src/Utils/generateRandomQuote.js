export const getRandomQuotes = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const quoteResult = fetch("https://zenquotes.io/api/quotes", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  return quoteResult;
};
