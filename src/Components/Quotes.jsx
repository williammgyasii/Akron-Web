import { useTheme } from "@emotion/react";
import { Container, makeStyles, Typography } from "@mui/material";
import {
  generateRandomQuote,
  getRandomQuotes,
} from "../Utils/generateRandomQuote";
import { useEffect, useState } from "react";

const Quotes = ({ text, author }) => {
  const theme = useTheme();
  const [quote, setQuote] = useState("");

  const getQuotes = async () => {
    const results = await getRandomQuotes();
    setQuote(results);
  };

  useEffect(() => {
    getQuotes();
  }, []);

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
      <Typography variant="">{quote}</Typography>
    </Container>
  );
};

export default Quotes;
