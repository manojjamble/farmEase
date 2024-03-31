import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import Pagination from "@mui/material/Pagination";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Products = () => {
  const sortArray = ["Top Rated", "Low Rated", "for sample"];

  return (
    <div>
      <div className="mb-24">
        <Navbar />
      </div>

      <div className="flex justify-between bg-slate-50 px-10">
        <input
          type="text"
          placeholder="search by location"
          className="p-2 w-[25rem] border border-gray-500"
        />
        <div className=" space-x-5">
          <input
            type="text"
            placeholder="search by Tools"
            className="p-2 w-[50rem] border border-gray-500"
          />
          <button className="p-2 bg-green-900 text-white w-[10rem]">
            search
          </button>
        </div>
      </div>

      <div className="px-10 mt-7 float-end">
        <select
          onChange={() => {}}
          value=""
          className="w-[8rem] text-gray-800 p-3 text-sm outline-none border border-gray-300 rounded-md focus:outline-none"
        >
          {sortArray.map((item) => (
            <option
              style={{ padding: "0.5rem" }}
              className="py-2 px-4 text-sm text-gray-800 bg-gray-200 hover:bg-gray-300"
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="p-10">
        <div className="mt-10">
          <p className="text-3xl font-bold my-5">Tracters</p>
          <div className="w-full grid grid-cols-4 gap-10">
            {[1, 1, 1, 1].map(() => (
              <div className="flex justify-center">
                <ProductCard />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <p className="text-3xl font-bold my-5">Harvestors</p>
          <div className="w-full grid grid-cols-4 gap-10">
            {[1, 1, 1, 1, 1, 1, 1, 1].map(() => (
              <div className="flex justify-center">
                <ProductCard />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-xl font-semibold text-center cursor-pointer text-gray-400 hover:text-gray-900">
        Load More Categories
      </div>

      <div className="float-end px-10 my-10">
        <Pagination count={10} variant="outlined" shape="rounded" />
      </div>

      <Footer/>
    </div>
  );
};

export default Products;
