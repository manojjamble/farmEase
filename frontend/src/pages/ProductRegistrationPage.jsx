import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function ProductRegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    description: "",
    rentalPrice: "",
    category: "",
    availability: "",
    images: [],
  });
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [additionalImages, setAdditionalImages] = useState([]);
  const [stage, setStage] = useState(1);
  const [savedFormData, setSavedFormData] = useState(null);
  const [savedAdditionalImages, setSavedAdditionalImages] = useState(null);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRemoveImage = (keyToRemove) => {
    setAdditionalImages((currentImages) =>
      currentImages.filter((img) => img.key !== keyToRemove)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      images: e.target.files[0],
    }));
  };

  const handleAdditionalImageChange = (e, index) => {
    const file = e.target.files[0];
    setAdditionalImages((prevImages) =>
      prevImages.map((img, i) => {
        if (i === index) {
          return { ...img, file };
        }
        return img;
      })
    );
  };

  const handleAddMoreImages = () => {
    setAdditionalImages((prevImages) => [
      ...prevImages,
      { key: Date.now(), file: null },
    ]);
  };

  const registerProduct = async (formData) =>{
      try {
         const token = localStorage.getItem('token');
         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
         const response = await axios.post(`${BASE_URL}/api/machine`,formData);
         console.log(response);
      } catch (error) {
         console.log(error.message);
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stage === 1) {
      setSavedFormData({ ...formData });
      setSavedAdditionalImages([...additionalImages]);
      setStage(2);
    } else if (stage === 2) {
      setStage(3);
    } else {
      try {
        console.log(formData);

        registerProduct(formData).then(()=>{

        })

        setFormData({
          name: "",
          company: "",
          description: "",
          rentalPrice: "",
          category: "",
          availability: "",
          images: [],
        });
        setAdditionalImages([]);
        setSavedFormData(null);
        setSavedAdditionalImages(null);
        setStage(1);
      } catch (error) {
        console.error("Error creating product:", error);
      }
    }
  };

  const handleBack = () => {
    if (stage === 2) {
      setStage(1);
    } else if (stage === 3) {
      setFormData(savedFormData);
      setAdditionalImages(savedAdditionalImages);
      setStage(2);
    }
  };

  const category = ["tractor", "harvestor", "plough"];

  return (
    <div>
      <Navbar />
      <div className="container mt-28 flex flex-col">
        <h1 className="text-3xl font-semibold mb-4 p-4">
          {" "}
          Product Registration - Stage {stage}
        </h1>
        <form onSubmit={handleSubmit}>
          {stage === 1 && (
            <div className="p-4 w-[60%] m-auto">
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
                  value={formData.name}
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
                  value={formData.company}
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
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="rentalPrice"
                >
                  Rental Price:
                </label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  type="number"
                  name="rentalPrice"
                  value={formData.rentalPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="category"
                >
                  Category:
                </label>
                <select
                  value={formData.category}
                  onChange={handleSelectChange}
                  name="category" // Add name attribute
                  className="w-full text-gray-800 p-3 text-sm outline-none border border-gray-300 rounded-md focus:outline-none"
                >
                  <option value="">Select an option</option>
                  {category.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Availability:
                </label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  type="text"
                  placeholder="example 10am to 12pm"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
          {stage === 2 && (
            <div>
              <button
                className="bg-green-500 hover:bg-green-600 mt-5 text-white font-bold mb-2 py-2 px-4 rounded"
                type="button"
                onClick={handleBack}
              >
                Back
              </button>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="mainImage"
                >
                  Upload Main Image:
                </label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  type="file"
                  name="mainImage"
                  onChange={handleImageChange}
                  required
                />
              </div>

              {additionalImages.map((imageObj, index) => (
                <div key={imageObj.key} className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={`additionalImage${index}`}
                  >
                    Upload Additional Image:
                  </label>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    type="file"
                    name={`additionalImage${index}`}
                    onChange={(e) => handleAdditionalImageChange(e, index)}
                    required
                  />
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded mt-2"
                    onClick={() => handleRemoveImage(imageObj.key)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={handleAddMoreImages}
              >
                Add More Images
              </button>
            </div>
          )}
          {stage === 3 && (
            <div>
              <div>
                <button
                  className="bg-green-500 hover:bg-green-600 mt-5 mb-2 text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={handleBack}
                >
                  Back
                </button>
              </div>
              <div className="bg-lime-300 mt-5 shadow-md p-6 rounded-lg">
                <h2 className="text-4xl font-semibold mb-4">Product Preview</h2>
                <div className="mb-4">
                  <p className="text-lg font-semibold">Name:</p>
                  <p className="text-gray-800">{formData.name}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Description:</h3>
                  <p className="text-gray-800">{formData.description}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Rental Price:</h3>
                  <p className="text-gray-800">{formData.rentalPrice}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Category:</h3>
                  <p className="text-gray-800">{formData.category}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Availability:</h3>
                  <p className="text-gray-800">{formData.availability}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Company:</h3>
                  <p className="text-gray-800">{formData.company}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Thumbnail Image
                  </h3>
                  {formData.images && (
                    <img
                      className="w-full max-w-lg rounded-md"
                      src={URL.createObjectURL(formData.images)}
                      alt="Main Product"
                    />
                  )}
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Additional Images
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {additionalImages.map((image, index) => (
                      <div key={index} className="w-full">
                        {image.file && (
                          <img
                            className="w-full h-full rounded-md object-cover"
                            src={URL.createObjectURL(image.file)}
                            alt={`Additional Image ${index}`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <button
            className="bg-green-500   hover:bg-green-600 mt-5 text-white font-bold px-4 py-2 rounded"
            type="submit"
          >
            {stage === 1 ? "Next" : stage === 2 ? "Next" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductRegistrationPage;
