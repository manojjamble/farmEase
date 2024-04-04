import React from "react";
import Navbar from "../components/Navbar.jsx";

const Contact = () => {
  return (
    <div className="bg-[#246f423d]">
      <div className="">
        <Navbar />
      </div>
      <div className="">
        <div className="w-full h-screen px-10 flex">
          <div className="w-full bg-[#246f423d] my-auto h-3/4 px-20 py-16">
            <p className="text-xl text-[#2f7678c3] font-medium">contact us</p>
            <div className="text-5xl text-[#2f7678c3] font-bold ">
              Get in Touch with <br /> FarmEase
            </div>
            <p className="mt-5 text-[#2f7678c3]">
              Feel free to connect with us for any of your needs regarding our
              services. <br /> Our support team is ready to solve any of your
              issues. Just push a text to us <br /> and we will get back to you
              immediately.
            </p>
            <div className="text-2xl text-[#2f7678c3] font-medium mt-5">
              India
            </div>
            <hr className="border  border-[#2f7678c3] my-5" />
            <div className="mt-7 text-[#2f7678c3] space-y-2">
              <div className="flex space-x-2 cursor-pointer">
                <i
                  class="ri-map-pin-2-fill"
                  style={{ fontSize: "20px", fontWeight: "800" }}
                />
                <p>Pune, Maharashtra 444905</p>
              </div>
              <div className="flex space-x-2 cursor-pointer">
                <i
                  class="ri-mail-fill"
                  style={{ fontSize: "20px", fontWeight: "800" }}
                />
                <a>farmease01@gmail.com</a>
              </div>
              <div className="flex space-x-2 cursor-pointer">
                <i
                  class="ri-phone-fill"
                  style={{ fontSize: "20px", fontWeight: "800" }}
                />
                <p>+91 9945670186</p>
              </div>
            </div>
          </div>
          <form
            action=""
            className="w-full my-auto bg-[#246f423d] h-3/4 px-20 py-16"
          >
            <p className="text-4xl font-bold text-[#2f7678c3]">
              Drop Us a Message
            </p>
            <div className="mt-4">
              <label
                className="block text-[#2f7678c3] text-sm font-bold mb-2"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                type="text"
                name="name"
                required
              />
            </div>
            <div className="mt-4">
              <label
                className="block text-[#2f7678c3] text-sm font-bold mb-2"
                htmlFor="name"
              >
                Your Number
              </label>
              <input
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                type="number"
                name="name"
                required
              />
            </div>
            <div className="mt-4">
              <label
                className="block text-[#2f7678c3] text-sm font-bold mb-2"
                htmlFor="name"
              >
                How Can We Help?
              </label>
              <textarea
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                type="textarea"
                name="name"
                required
              />
            </div>
            <div className="mt-7">
              <button
                type="submit"
                className="w-full bg-[#2f7678c3] p-2 hover:shadow-lg"
              >
                Send My Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;