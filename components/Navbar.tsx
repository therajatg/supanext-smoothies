import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <h1>Supa Smoothies</h1>
      <Link href="/">Home</Link>
      <Link href="/create">Create New Smoothie</Link>
    </nav>
  );
};

export default Navbar;
