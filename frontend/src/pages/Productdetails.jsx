import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reviewscard from "../components/Reviewscard";
import ProductInfoCard from "../components/ProductInfoCard/ProductInfoCard.jsx";
import ProductCard from "../components/ProductCard.jsx";
const ProductDetails = () => {
  return (
    <div>
      <div className="mb-24">
        <Navbar />
      </div>
      <ProductInfoCard />
      <div className="px-10">
        <Reviewscard />
      </div>
      <div className="my-10 px-10 ">
        <p className="text-3xl font-bold my-5">Tracters</p>
        <div className="w-full grid grid-cols-4 gap-10">
          {[1, 1, 1, 1].map(() => (
            <div className="flex justify-center">
              <ProductCard />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
