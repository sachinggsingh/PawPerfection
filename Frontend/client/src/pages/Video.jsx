import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideo } from '../redux/courses/videoSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import VideoCard from './VideoCard';

const Video = () => {
  const dispatch = useDispatch();
  const { video, loading, error } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(fetchVideo());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-6 mt-16">
        {loading && <LoadingSpinner />}
        {error && <div className="text-red-500 text-center mt-16">{error}</div>}
        {!loading && !error && video?.length === 0 && (
          <div className="text-gray-500 text-center mt-16">No videos available</div>
        )}
        <div className="flex flex-wrap justify-center items-center gap-6">
          {video?.map((item) => (
            <VideoCard key={item._id} video={item} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Video;
