import React from "react";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Events from "../components/Events";
import Categories from "../components/Categories";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Hero />
      <SearchBar />
      <Events />
      <Categories />
      <Footer />
    </div>
  );
}

export default Home;