import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <div>{currentYear}© Все права и планета защищены</div>;
};

export default Footer;
