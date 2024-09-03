import Features from "../Pages/LandingPage/subpages/Features";
import Pricing from "../Pages/LandingPage/subpages/Pricing";
import About from "../Pages/LandingPage/subpages/About";
import Blog from "../Pages/LandingPage/subpages/Blog";
import Contact from "../Pages/LandingPage/subpages/Contact";
import LandingPage from "../Pages/LandingPage/LandingPage";

export const navbarLinks = [
  {
    link: "/",
    title: "Home",
    element: <LandingPage />,
    index: true,
  },
  {
    link: "/features",
    title: "Features",
    element: <Features />,
  },
  {
    link: "/pricing",
    title: "Pricing",
    element: <Pricing />,
  },
  {
    link: "/about",
    title: "About",
    element: <About />,
  },
  {
    link: "/blog",
    title: "Blog",
    element: <Blog />,
  },
  {
    link: "/contact",
    title: "Contact",
    element: <Contact />,
  },
];
