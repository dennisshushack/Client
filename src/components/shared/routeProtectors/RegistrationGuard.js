import React from "react";
import { Redirect } from "react-router-dom";

/**
 *
 * Another way to export directly your functional component.
 * If he is not Registered the Registration.js is rendered
 */
export const RegistrationGuard = props => {
  if (!localStorage.getItem("token")) {
    return props.children;
  }
  // if user is already Registered, he is redirected to the main /app
  return <Redirect to={"/game"} />;
};
