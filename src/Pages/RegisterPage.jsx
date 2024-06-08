import React from "react";
import { useSelector } from "react-redux";

function RegisterPage() {
  const selectCount = useSelector((state) => state.firebase.count);
  return <div>{selectCount}</div>;
}

export default RegisterPage;
