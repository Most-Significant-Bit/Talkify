import React from "react";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <> 
    <Navbar/><div className="max-w-4xl h-screen mx-auto p-24">
      <h1 className="text-4xl font-bold text-green-600 mb-6">About Talkify</h1>

      <p className="text-lg text-white mb-4">
        <strong>Talkify</strong> is a full-stack podcast and video streaming platform designed to let users create, share, and explore audio-visual content in an engaging way. Whether you're a creator or a listener, Talkify provides a social, personalized space for everyone.
      </p>

      <p className="text-md text-white mb-4">
        Built using the <strong>MERN stack</strong> (MongoDB, Express.js, React.js, Node.js) and styled with <strong>Tailwind CSS</strong>, Talkify combines speed and design to ensure a seamless user experience across devices.
      </p>

      <p className="text-md text-white mb-4">
        Users can upload podcasts, view their favorites, follow other users, and manage their profiles including updating their avatars. Our app also features an All Users page to explore creators and connect with others who share similar interests.
      </p>

      <p className="text-md text-white mb-4">
        This project was developed as a final year BTech project by a dedicated four-member team. I worked on both the frontend and backend, taking full responsibility as a full-stack developer to ensure the components were connected smoothly.
      </p>

      <p className="text-sm text-white">
        Challenges like CORS issues and Cloudinary upload errors were successfully resolved during development with the help of ChatGPT.
      </p>
    </div>
    </>
    
  );
};

export default About;
