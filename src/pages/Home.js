import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container">
        <h1 id="hero-heading">Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          Little Lemon is a family-owned Mediterranean restaurant, focused on
          traditional recipes served with a modern twist. Reserve your table
          online in just a couple of minutes.
        </p>
        <Link to="/booking" className="btn">
          Reserve a Table
        </Link>
      </div>
    </section>
  );
}

export default Home;
