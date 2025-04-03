import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader, Upload } from 'lucide-react'

export default function UploadForm() {
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: null,
    description: "",
    category: "",
    episode: null,
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const isLoading = false;

  return (
    <div className="w-full h-250 pl-130 pt-30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
    overflow-hidden"
      >
        <div className="max-w-lg mx-auto bg-grey-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Upload Your Episode
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
            />

            {/* Thumbnail Upload */}
            <div className="flex justify-between items-end gap-5 w-full py-3 px-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200">
                <label htmlFor="files" className="text-gray-400">Add Thumbnail</label>
                <input id="files" className="text-gray-500" accept="image/*" onChange={handleFileChange} name="thumbnail" type="file"/>
            </div>
    
            {/* Description */}
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
            />

            {/* Category Dropdown */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-gray-400 placeholder-gray-400 transition duration-200"
            >
              <option value="">Select Category</option>
              <option value="comedy">Comedy</option>
              <option value="horror">Horror</option>
              <option value="motivational">Motivational</option>
            </select>

            {/* Episode Upload */}
            <div className="border-2 border-gray-700 py-10 px-10 text-center rounded">
              <input
                type="file"
                name="episode"
                accept="audio/*,video/*"
                onChange={handleFileChange}
                className="hidden w-full py-3 px-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
                id="episode-upload"
              />
              <Upload style={{marginLeft : "180px", color: "green", marginBottom : "10px"}}/>
              <label
                htmlFor="episode-upload"
                className="cursor-pointer text-gray-400"
              >
                
                Upload your episode
              </label>
            </div>

            {/* Tags */}
            <textarea
              name="tags"
              placeholder="Tags (comma-separated)"
              value={formData.tags}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
            />

            {/* Submit Button */}
            <motion.button
            className="mt-3 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <Loader className="mx-auto animate-spin" />
            ) : (
              "Submit"
            )}
          </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
