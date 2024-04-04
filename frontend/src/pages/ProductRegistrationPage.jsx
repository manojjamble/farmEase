import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function ProductRegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    description: "",
    rentalPrice: "",
    condition: "",
    images: [],
  });

  const [additionalImages, setAdditionalImages] = useState([]);
  const [stage, setStage] = useState(1);
  const [savedFormData, setSavedFormData] = useState(null);
  const [savedAdditionalImages, setSavedAdditionalImages] = useState(null);

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
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("company", formData.company);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("rentalPrice", formData.rentalPrice);
        formDataToSend.append("condition", formData.condition);
        formDataToSend.append("mainImage", formData.images);
        additionalImages.forEach((imageObj, index) => {
          if (imageObj.file) {
            // Make sure the file exists
            formDataToSend.append(`additionalImage${index}`, imageObj.file);
          }
        });

        setFormData({
          name: "",
          company: "",
          description: "",
          rentalPrice: "",
          condition: "",
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
  return (
    <div className="">
      <Navbar />
      <div className="bg-green-50 w-full mt-10 py-4 min-h-screen">
        <div className="container mx-auto flex w-full">
          {stage !== 3 && (
            <div className="w-[50%] h-[40rem] mt-14 flex  justify-center p-10">
              <img
                src="../src/assets/mm.png"
                alt="image"
                className="h-full rounded-xl border shadow-md shadow-emerald-300 border-5 border-green-300"
              />
            </div>
          )}

          <div className="right w-[60%] mx-auto mt-14 px-6  py-8 bg-green-100 shadow-md rounded-lg">
            <h1 className="text-3xl font-semibold mb-4 text-center">
              Product Registration - Stage {stage}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {stage === 1 && (
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
                      htmlFor="condition"
                    >
                      Condition:
                    </label>
                    <input
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      type="text"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              {stage === 2 && (
                <div className="p-4">
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
                </div>
              )}
              {stage === 3 && (
                <div className="p-4">
                  <h2 className="text-4xl text-center font-semibold mb-4">
                    Product Preview
                  </h2>

                  <div className="bg-teal-100 mt-5 shadow-md p-6 rounded-lg">
                    <div className="p-4 grid grid-cols-2">
                      <div className="mb-4">
                        <p className="text-lg font-semibold">Name:</p>
                        <p className="text-gray-800">{formData.name}</p>
                      </div>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">
                          Description:
                        </h3>
                        <p className="text-gray-800">{formData.description}</p>
                      </div>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">
                          Rental Price:
                        </h3>
                        <p className="text-gray-800">{formData.rentalPrice}</p>
                      </div>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">
                          Condition:
                        </h3>
                        <p className="text-gray-800">{formData.condition}</p>
                      </div>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Company:</h3>
                        <p className="text-gray-800">{formData.company}</p>
                      </div>
                    </div>
                    <div className="mb-4 flex flex-col justify-center items-center">
                      <h3 className="text-xl font-semibold mb-4">
                        Thumbnail Image
                      </h3>
                      {formData.images && (
                        <img
                          className="w-full  max-w-lg border border-5 border-teal-300 rounded-md"
                          src={URL.createObjectURL(formData.images)}
                          alt="Main Product"
                        />
                      )}
                    </div>
                    <div className="mb-4 flex flex-col justify-center items-center">
                      <h3 className="text-xl font-semibold mb-4">
                        Additional Images
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {additionalImages.map((image, index) => (
                          <div key={index} className="w-full">
                            {image.file && (
                              <img
                                className="w-full h-full border border-5 border-teal-300  rounded-md object-cover"
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
              <div className="flex flex-row-reverse justify-between">
                <button
                  className="bg-green-500 hover:bg-green-600  text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  {stage === 1 || stage === 2 ? "Next" : "Submit"}
                </button>
                {stage > 1 && (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductRegistrationPage;
