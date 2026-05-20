import React from "react";

const categories = [
  "Music",
  "Food",
  "Sports",
  "Business",
  "Travel",
  "Party",
];

function Categories() {
  return (
    <div className="py-20 bg-gray-100">

      <h1 className="text-center text-5xl font-bold mb-16">
        Browse Categories
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-6 gap-5 px-5">

        {categories.map((cat, index) => (<div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-md text-center text-xl font-semibold hover:bg-pink-500 hover:text-white duration-300"
          >
            {cat}
          </div>
        ))}

      </div>
    </div>
  );
}

export default Categories;