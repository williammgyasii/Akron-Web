import { useTheme } from "@emotion/react";
import { Container, makeStyles, Typography } from "@mui/material";
import { generateRandomQuote } from "../Utils/generateRandomQuote";

const Quotes = ({ text, author }) => {
  const theme = useTheme();
  //   const randomQuote = generateRandomQuote()
  //   console.log(randomQuote)
  return (
    <Container
      sx={{
        borderLeft: "4px solid #cccccc",
        paddingLeft: "16px",
        marginBottom: "20px",
        fontFamily: "Georgia",
        marginTop: "30px",
        fontStyle: "italic",
        color: "#fff",
      }}
    >
      <Typography variant="h5">
        "{text}" <span style={{ marginLeft: "1rem" }}>- {author}</span>
      </Typography>
    </Container>
  );
};

export default Quotes;
