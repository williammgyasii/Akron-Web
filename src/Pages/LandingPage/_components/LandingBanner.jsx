import { Box, Container, Typography, useTheme } from "@mui/material";
import React from "react";
import illustration from "../_assets/_images/banner.png";

function LandingBanner() {
  const theme = useTheme();
  return (
    <Box
      component={"section"}
      id="home"
      sx={{
        backgroundColor: "red",
        paddingTop: "4%",
        minHeight: "100svh",
        paddingBottom: "6px",
        [theme.breakpoints.down("tablets_port")]: {
          paddingTop: "10%",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: "blue",
          flexDirection:"row",
          alignItems: "center",
          justifyContent:"space-between",
          minHeight: "auto",
          [theme.breakpoints.between("desktop", "desktop_large")]: {
            fontSize: "12px",
            lineHeight: "1.5",
          },
          [theme.breakpoints.down("tablets_port")]: {
            gridTemplateColumns: "0.95fr 1.05fr",
            paddingTop: "0",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor:"yellow",
            textAlign: "center",
            h1: {
              fontWeight: 700,
              fontSize: "8px",
              lineHeight: "1.26",
              letterSpacing: "0",
              color: "#textSecondary",
              "@media (min-width: 768px)": {
                fontSize: "10px",
              },
              "@media (min-width: 1441px) and (max-width: 1600px)": {
                fontSize: "12px",
                lineHeight: "1.5",
              },
            },
            p: {
              fontSize: "1px",
              lineHeight: "1.5",
              color: "#textSecondary",
              maxWidth: "470px",
              margin: "30px auto",
              marginTop: "3px",
              "@media (min-width: 768px)": {
                fontSize: "2px",
                lineHeight: "2",
              },
              "@media (min-width: 1024px)": {
                fontSize: "3px",
              },
            },
          }}
        >
          <Typography variant="h1">
            Sistema de suporte final para agências líderes
          </Typography>
          <Typography variant="p">
            Obtenha seus testes entregues em casa coletar amostra do vitória das
            gestões que fornecem melhor sistema de design diretrizes de sempre.
          </Typography>
          {/* <SubscriptionForm sx={styles.subscriptionForm} /> */}
          <Box sx={styles.sponsoredBy}>
            <Typography as="span">Patrocinado por:</Typography>
            {/* <Box sx={styles.sponsor}>
                {logos?.map((logo, index) => (
                  <Flex as="figure" key={index}>
                    <Image src={logo.src} alt={logo.name} />
                  </Flex>
                ))}
              </Box> */}
          </Box>
        </Box>
        <Box
          component={"figure"}
          sx={{
            alignItems: "center",
            mt: [9, null, null, null, 0],
            img: {
              maxWidth: [null, null, null, "80%", "100%"],
              m: [null, null, null, "0 auto", 0],
            },
          }}
        >
          <img src={illustration} alt="illustration" />
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  bannerContent: {},
  subscriptionForm: {
    maxWidth: "470px",
    margin: "30px auto",
    marginTop: "6px",
    input: {
      backgroundColor: "#FFFFFF",
      border: "0 none",
      fontFamily: "body",
      fontSize: "1px",
      paddingLeft: "5px",
      boxShadow: "0px 16px 40px rgba(72, 59, 26, 0.08)",
      minHeight: "40px",
      "::placeholder": {
        color: "rgba(2, 7, 62, 0.4)",
      },
      "@media (min-width: 768px)": {
        fontSize: "2px",
        minHeight: "50px",
      },
    },
    button: {
      fontSize: "0px",
      minHeight: "40px",
      "@media (min-width: 768px)": {
        fontSize: "1px",
        minHeight: "50px",
      },
    },
  },
  sponsoredBy: {
    alignItems: "center",
    maxWidth: "470px",
    margin: "30px auto",
    marginTop: "6px",
    span: {
      fontSize: "13px",
      lineHeight: "2.62",
      color: "rgba(86, 98, 114, 0.6)",
    },
  },
  sponsor: {
    alignItems: "center",
    figure: {
      marginLeft: "2px",
      "@media (min-width: 768px)": {
        marginLeft: "4px",
      },
      "@media (min-width: 1024px)": {
        marginLeft: "5px",
      },
    },
    img: {
      maxWidth: "60px",
      "@media (min-width: 768px)": {
        maxWidth: "80px",
      },
      "@media (min-width: 1024px)": {
        maxWidth: "100%",
      },
    },
  },
  bannerImage: {
    alignItems: "center",
    marginTop: "9px",
    img: {
      maxWidth: "80%",
      margin: "0 auto",
      "@media (min-width: 1024px)": {
        maxWidth: "100%",
      },
    },
  },
};

export default LandingBanner;
