import React from "react";
import { useParams } from "react-router-dom";

const SingleProjectPage = () => {
  const { id } = useParams(); // Retrieve the id from the route
  return <div>SingleProjectPage:{id}</div>;
};

export default SingleProjectPage;
