import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {  X, CreditCard, Clock, Users } from 'lucide-react';

const VideoCard = ({ video }) => {
  const [showDetails, setShowDetails] = useState(false);
  

  return (
    <>
      <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-sm border border-white/20">
        <div className="relative aspect-video group cursor-pointer">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-all duration-300">
          </div>
          <div className="absolute top-3 right-3 bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded-full shadow-lg">
            ₹{video.price}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{video.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{video.description}</p>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-gray-500 text-xs">
              <Clock className="w-4 h-4 mr-1" />
              <span>12 mins</span>
            </div>
            <div className="flex items-center text-gray-500 text-xs">
              <Users className="w-4 h-4 mr-1" />
              <span>2.4k enrolled</span>
            </div>
          </div>

          <button
            className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
            onClick={() => setShowDetails(true)}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Purchase Now
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-white to-gray-50 rounded-2xl p-8 shadow-2xl">
            <button
              onClick={() => setShowDetails(false)}
              className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors duration-200"
            >
              <X className="w-8 h-8 cursor-pointer" />
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-2/5">
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  </div>
                </div>
              </div>

              <div className="w-full md:w-3/5">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{video.title}</h2>
                <p className="text-gray-600 mb-5">{video.description}</p>

                <div className="bg-blue-50 p-4 rounded-xl mb-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600">Price</span>
                    <span className="text-2xl font-bold text-blue-600">₹{video.price}</span>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">12 minutes</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Access</span>
                    <span className="font-medium">Lifetime</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  <button className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Payment
                  </button>

                  <p className="text-xs text-center text-gray-500">Secure payment processed via SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

VideoCard.propTypes = {
  video: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default VideoCard;