import React from 'react';

const MapLocation = () => {
  return (
    <div className="w-full max-w-3xl mt-4 shadow-lg rounded-lg overflow-hidden border-2 border-gray-300">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62606.68395969091!2d75.9013238063802!3d11.267456561535692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45db61255acbd1%3A0x9388c98e59a10450!2zVSBWRU5VRSDZhdiz2LHYrSDZitmIINmB2YrZhtmK2Yg!5e0!3m2!1sen!2sqa!4v1731049194793!5m2!1sen!2sq"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-96 border-none"
      ></iframe>
    </div>
  );
};

export default MapLocation;
