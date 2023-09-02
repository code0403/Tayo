import React from "react";
import "./App.css";
import ContactRoutes from "./routing/routes";
import Nav from "./Navbar/Nav";

// import Layout from './Layout';

function App() {
  return (
    <div className="App">
      <Nav />
      <ContactRoutes />
    </div>
  );
}

export default App;
