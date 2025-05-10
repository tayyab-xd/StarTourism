import React, { useContext, useState } from 'react';
import { useNavigate, useParams, useLocation, NavLink } from 'react-router-dom';
import { AppContext } from '../context/context';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SingleTrip = () => {
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const context = useContext(AppContext);
  const trip = context.state.allTrips.find((item) => item._id === id);
  const user = JSON.parse(localStorage.getItem('startourism'));

  const handleApply = async () => {
    setLoading(true);
    if (user) {
      const formData = new FormData();
      formData.append('fullName', user.name);
      formData.append('email', user.email);
      formData.append('phoneNumber', user.phone);
      formData.append('tripName', trip.name);

      try {
        await axios.post('http://localhost:3000/trip/apply', formData);
        toast.success('Successfully applied for the trip!', {
          position: 'top-center',
          theme: 'dark',
        });
        setShowConfirmation(true);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong. Please try again.', {
          position: 'top-center',
          theme: 'dark',
        });
        setLoading(false);
      }
    } else {
      navigate('/login', { state: { from: location.pathname } });
    }
  };

  return (
    <motion.div
      className="single-trip min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 sm:px-10 transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <ToastContainer />
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Application Submitted</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You will be contacted via your registered <strong>email</strong> or <strong>phone</strong>.
            </p>
            <button
              onClick={() => setShowConfirmation(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <NavLink to={`/edittrip/${trip && trip._id}`}>
        <motion.button
          className="edit-button text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 rounded-lg px-4 py-2 mb-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          Edit
        </motion.button>
      </NavLink>

      <motion.h1
        className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {trip?.name}
      </motion.h1>

      {/* Swiper for Image Slider */}
      <motion.div
        className="trip-images mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          navigation={true}
          pagination={{ clickable: true }}
          className="swiper-container"
        >
          {trip &&
            trip.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={trip.name}
                  className="max-h-[500px] w-auto max-w-full object-contain mx-auto rounded-lg shadow-lg"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </motion.div>

      {/* Video */}
      {trip?.video && (
        <motion.div
          className="trip-video mb-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <video controls className="rounded-lg shadow-lg max-w-full max-h-[400px]">
            <source src={trip.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      )}

      {/* Trip Details */}
      <motion.div
        className="trip-details text-lg text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p><strong>Duration:</strong> {trip?.duration}</p>
        <p><strong>Price:</strong> Rs{trip?.price}</p>
        <p><strong>Description:</strong> {trip?.description}</p>
      </motion.div>

      {/* Apply Button */}
      <motion.button
        onClick={handleApply}
        disabled={loading}
        className="apply-button mt-6 text-white bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-400 rounded-full px-6 py-3"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {loading ? 'Applying...' : 'Apply'}
      </motion.button>
    </motion.div>
  );
};

export default SingleTrip;
