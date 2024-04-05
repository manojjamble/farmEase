import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function ProductRegistrationPage() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [machineDetails, setMachineDetails] = useState({
    name: "",
    company: "",
    description: "",
    rentalPrice: "",
    availability: "",
    category:""
  });

  const [images, setImages] = useState([]);

  const handleRemoveImage = (keyToRemove) => {
    setImages((currentImages) =>
      currentImages.filter((img) => img.key !== keyToRemove)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMachineDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleAddMoreImages = () => {
    const newImageKey = Date.now();
    setImages((prevImages) => [...prevImages, { key: newImageKey, file: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData1 = new FormData();
      formData1.append("name", machineDetails.name);
      formData1.append("company", machineDetails.company);
      formData1.append("description", machineDetails.description);
      formData1.append("rentalPrice", machineDetails.rentalPrice);
      formData1.append("availability", machineDetails.availability);
      formData1.append("category" , machineDetails.category);

      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const machineDetailsResponse = await axios.post(`${BASE_URL}/api/machine`, formData1);
      console.log(machineDetailsResponse);

      // const formData2 = new FormData();
      // images.forEach((imageObj, index) => {
      // formData2.append(`image${index}`, imageObj.file);
      // });

      // const imagesResponse = await axios.post(`${BASE_URL}/api/machineImages`, formData2);
      // console.log(imagesResponse);

      // Reset form after successful submission
      setMachineDetails({
        name: "",
        company: "",
        description: "",
        rentalPrice: "",
        availability: "",
        category:""
      });
      // setImages([]);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="bg-green-50 w-full mt-10 py-4 min-h-screen">
        <div className="container mx-auto flex w-full">
          <div className="right w-[60%] mx-auto mt-14 px-6  py-8 bg-green-100 shadow-md rounded-lg">
            <h1 className="text-3xl font-semibold mb-4 text-center">
              Product Registration
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    type="text"
                    name="name"
                    value={machineDetails.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="company"
                  >
                    Company:
                  </label>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    type="text"
                    name="company"
                    value={machineDetails.company}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description:
                  </label>
                  <textarea
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    name="description"
                    value={machineDetails.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rentalPrice">
                    Rental Price:
                  </label>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    type="number"
                    name="rentalPrice"
                    value={machineDetails.rentalPrice}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                    Category:
                  </label>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    type="test"
                    name="category"
                    value={machineDetails.category}
                    onChange={handleChange}
                    placeholder="tractor / harvestor"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="availability"
                  >
                    Availability:
                  </label>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    type="text"
                    name="availability"
                    value={machineDetails.availability}
                    onChange={handleChange}
                    placeholder="9:00am - 5:00pm"
                  />
                </div>
              </div>

              {/* Upload images */}
              {/* <div className="p-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="mainImage"
                  >
                    Upload Images:
                  </label>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    type="file"
                    name="images"
                    onChange={handleImageChange}
                    multiple
                    required
                  />
                </div>
                {images.map((imageObj, index) => (
                  <div key={imageObj.key} className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor={`additionalImage${index}`}
                    >
                      Upload Additional Image:
                    </label>
                    <div className="flex items-center space-x-2 justify-between">
                      <input
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        type="file"
                        name={`additionalImage${index}`}
                        onChange={(e) =>
                          handleAdditionalImageChange(e, index)
                        }
                        required
                      />
                      <button
                        type="button"
                        className="bg-green-200 hover:bg-red-200 text-black font-bold py-2 px-4 rounded"
                        onClick={() => handleRemoveImage(imageObj.key)}
                      >
                        <span style={{ color: "brown" }}>
                          <i class="ri-delete-bin-6-fill"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={handleAddMoreImages}
                >
                  Add More Images
                </button>
              </div> */}

              <div className="flex flex-row-reverse justify-between">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductRegistrationPage;
