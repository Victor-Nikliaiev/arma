import "./Footer.scss";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer>{currentYear}© Все права и планета защищены</footer>;
};

export default Footer;
