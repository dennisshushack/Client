import React from "react";
import { Redirect } from "react-router-dom";

/**
 *
 * Another way to export directly your functional component.
 * If he is registered or loged in, he can see the profile page
 */
export const ProfileGuard = props => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  // Else he is redirected to the login
  return <Redirect to={"/login"} />;
};
