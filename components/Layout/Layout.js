import React, { Component } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />

      {children}

      <Footer />
    </div>
  );
}
export default Layout;
