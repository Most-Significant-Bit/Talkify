import React from "react";
import Navbar from "../components/Navbar"
import { Bounce, toast } from "react-toastify"

const ContactUs = () => {


  const handleSubmit = ()=>{
    toast.success("Feedback Saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

  }

  return (
    <> 
    <Navbar/>
    <div className="min-h-screen pt-35 bg-transparent text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left Section - Contact Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="mb-8 text-white">
            Feel free to use the form or drop us an email. Old-fashioned phone calls work too.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📞</span>
              <p>484.324.2400</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📧</span>
              <p>info@mediaproper.com</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <p>
                15 West 3rd St.<br />
                Media, Pa. 19063
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <form onSubmit={handleSubmit} className="bg-transparent border-2 border-green-500 rounded-lg shadow-md p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">First</label>
              <input
                type="text"
                placeholder="First"
                className="w-full border border-green-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last</label>
              <input
                type="text"
                placeholder="Last"
                className="w-full border border-green-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full border border-green-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Phone (optional)</label>
            <input
              type="tel"
              placeholder="xxx-xxx-xxxx"
              className="w-full border border-green-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
              rows="4"
              placeholder="Type your message ..."
              className="w-full border border-green-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold px-6 py-2 rounded-md transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
   
  );
};

export default ContactUs;