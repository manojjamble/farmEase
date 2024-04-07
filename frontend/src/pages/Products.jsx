import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Pagination from "@mui/material/Pagination";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios"
import TextField from '@mui/material/TextField';

const Products = () => {
  const sortArray = ["Top Rated", "Low Rated", "for sample"];
  const [machines, setMachines] = useState([]);
  const [machinesByCategory, setMachinesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL;


  const [displayedCategories, setDisplayedCategories] = useState(4); // Number of categories to display initially
  const [allCategoriesLoaded, setAllCategoriesLoaded] = useState(false);

  const handleLoadMoreCategories = () => {
    // Display all available categories
    setDisplayedCategories(displayedCategories + 4);
    // setAllCategoriesLoaded(true);
  };

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        //gettin machine details 
        const response = await axios.get(`${BASE_URL}/api/machine/all`);
        // console.log("response data is ", response.data);
        const machinesData = response.data;

        const sortedMachines = machinesData.reduce((acc, machine) => {
          if (!acc[machine.category]) {
            acc[machine.category] = [];
          }

          // Push the current machine to the corresponding category array
          acc[machine.category].push(machine);
          return acc;
        }, {});

        //getting  category wise sorted machine data
        // console.log("machine by categories ", sortedMachines);
        setMachinesByCategory(sortedMachines);

        setMachines(response.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching machines:', error.message);
      }
    };

    const fetchImagesForMachine = async (machine) => {
      try {
        const images = await Promise.all(
          machine.img.map(async (imageId) => {
            const imageResponse = await axios.get(`http://localhost:3000/api/image?imgId=${imageId}`);
            console.log("Image response data " ,imageResponse.data);
            return imageResponse.data;
          })
        );
        return { ...machine, images };
      } catch (error) {
        console.error('Error fetching images for machine:', error);
        return machine; // Return the machine without images in case of error
      }
    };
    

    // Function to fetch images for all machines
    const fetchImagesForAllMachines = async (machines) => {
      try {
        const updatedMachines = await Promise.all(
          machines.map(async (machine) => {
            return fetchImagesForMachine(machine);
          })
        );
        setMachines(updatedMachines);
      } catch (error) {
        console.error('Error fetching images for all machines:', error);
      }
    };
    
    

    fetchMachines();
    console.log("fetchImagesForAllMachines called");
    fetchImagesForAllMachines(machines);

  }, []);

  console.log("Updated machines with image id" ,machines)





  return (
    <div>
      <div className="mb-24">
        <Navbar />
      </div>


      {/* Search bar */}
      <div className="flex flex-col lg:flex-row sm:flex-col md:flex-col  items-center gap-10  justify-evenly bg-slate-50 px-10">

        {/* Location search input */}
        <TextField
          id="standard-search"
          label="Search Location"
          type="search"
          variant="standard"
          placeholder="Search by location"
          className=" md:w-[15rem] mr-3 md:mb-0 md:mr-3"
        />

        {/* Tool search input and search button */}
        <div className="flex lg:flex-row  sm:flex-col md:flex-col">
          <TextField
            id="standard-search"
            label="Search Product"
            type="search"
            variant="standard"
            placeholder="Search by Product"
            className=" md:w-[35rem] mr-3 md:mb-0 md:mr-3"
          />
          <button className="p-2 mt-2 bg-green-900 rounded-3xl text-white w-[5rem] md:w-[10rem] sm-w-[5rem]">
            Search
          </button>
        </div>

        {/* Sort dropdown */}
        <div className="px-10  float-end md:float-none md:w-auto md:text-right">
          <select
            // yet to add sort feature
            onChange={() => { }}
            value=""
            className="w-[8rem] text-gray-800 p-3 text-sm outline-none border border-gray-300 rounded-md focus:outline-none md:w-full"
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
      </div>


      {/* Category-wise machines */}
      <div className="p-10">
        {Object.entries(machinesByCategory).slice(0, displayedCategories).map(([category, machines]) => (
          <div key={category} className="mt-10">
            <p className="text-3xl font-bold my-5">{category}</p>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {machines.slice(0, 4).map((machine) => (
                <div key={machine._id} className="flex justify-center">
                  {/* Render ProductCard with machine data */}
                  <ProductCard machine={machine} />

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Load more categories */}
      {!allCategoriesLoaded && (
        <div className="text-xl font-semibold text-center cursor-pointer text-gray-400 hover:text-gray-900 mb-5 md:mb-0" onClick={handleLoadMoreCategories}>
          Load More Categories
        </div>
      )}

      {/* Pagination */}
      {/* <div className="float-end px-10 my-10">
        <Pagination count={10} variant="outlined" shape="rounded" />
      </div> */}

      {/* Footer */}
      <Footer />

    </div>
  );


};

export default Products;
