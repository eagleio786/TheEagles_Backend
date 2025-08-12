import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NumberRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routePattern = /\d/;

  // Allow /home/:id but redirect other numeric routes
  React.useEffect(() => {
    if (
      routePattern.test(location.pathname) &&
      !location.pathname.startsWith("/home/")
    ) {
      navigate(`/redirect?route=${encodeURIComponent(location.pathname)}`);
    }
  }, [location, navigate, routePattern]);

  return null;
};

export default NumberRedirect;
