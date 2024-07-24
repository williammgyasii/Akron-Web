export const getRandomQuotes = () => {
  fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Error fetching quotes:", error));
};
