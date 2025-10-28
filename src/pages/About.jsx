import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
  

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">About Us</h1>
          <p className="text-gray-700 text-lg mb-4">
            Welcome to Saira's Web Hub! I build modern, responsive, and interactive web applications using React, Tailwind CSS, and JavaScript.
          </p>
          <p className="text-gray-700 text-lg">
            My goal is to create web solutions that are simple, elegant, and highly functional. Explore our mini-projects and see how we bring ideas to life!
          </p>
        </div>
      </main>

    
  );
}
