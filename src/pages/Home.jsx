import React, { useContext } from 'react';
import { AppContext } from '../context/context';
import { motion } from 'framer-motion'; 
import { NavLink } from 'react-router-dom';

const Home = () => {
  const context=useContext(AppContext)
  const alltrips = context.state.allTrips;
  const topTrips=alltrips.slice(0,4)
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Explore the World with Us</h1>
        <p className="text-lg sm:text-xl mb-6">Adventure awaits. Discover top destinations with The Star Tourism Club.</p>
        <a
          href="/trips"
          className="cta-button bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition-all"
        >
          View Destinations
        </a>
      </section>

      {/* Destinations Section */}
      <section className="bg-gray-800 text-white py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Top Destinations</h2>
        {/* Motion for Grid Items */}
              <motion.div
                className="destination-grid grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: 'easeOut' }}
              >
                {alltrips && topTrips.map(item => (
                  <motion.div
                    key={item._id}
                    className="destination-card bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden relative group"
                    whileHover={{ scale: 1.05 }} // Card hover effect to scale it slightly
                    whileTap={{ scale: 0.95 }}  // Card tap effect
                    transition={{ duration: 0.3 }}
                  >
                    <NavLink to={`/singletrip/${item._id}`}>
                      {/* Image */}
                      <div className="relative h-96 w-full overflow-hidden rounded-t-2xl">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
        
                      {/* Name: Centered in the middle */}
                      <motion.h3
                        className="absolute inset-0 flex items-center justify-center text-amber-500 text-3xl font-semibold z-10 group-hover:translate-y-[-10%] transition-transform duration-500"
                      >
                        {item.name}
                      </motion.h3>
        
                      {/* Description and Button: Hidden by default and will slide up on hover */}
                      <motion.div
                        className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent rounded-b-2xl z-0 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                      >
                        <p className="text-white mb-2">
                          {item.description.length > 100
                            ? item.description.substring(0, 100) + '...'
                            : item.description}
                        </p>
                        <motion.button
                          className="view-button text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 rounded-full px-4 py-2 transition-colors duration-300"
                          whileHover={{ scale: 1.1 }} // Button hover effect
                          whileTap={{ scale: 0.95 }}  // Button tap effect
                          transition={{ duration: 0.3 }}
                        >
                          View Details
                        </motion.button>
                      </motion.div>
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>
      </section>

      {/* Why Us Section */}
      <section className="bg-gray-900 text-white py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Why Choose Us?</h2>
        <ul className="space-y-4 text-lg max-w-2xl mx-auto">
          <li className="flex items-center gap-2">
            <span className="text-green-400">✔️</span> Customized Travel Packages
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✔️</span> Affordable Prices
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✔️</span> 24/7 Support
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✔️</span> Experienced Guides
          </li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-800 text-white py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">What Our Customers Say</h2>
        <div className="testimonial text-center bg-gray-700 p-6 rounded-lg shadow-md mb-8 transition-all hover:scale-105">
          <p className="text-xl mb-4">"Best experience ever! Everything was organized perfectly."</p>
          <span className="block text-lg text-gray-300">- Sarah A.</span>
        </div>
        <div className="testimonial text-center bg-gray-700 p-6 rounded-lg shadow-md transition-all hover:scale-105">
          <p className="text-xl mb-4">"Highly recommended. Great service and beautiful locations!"</p>
          <span className="block text-lg text-gray-300">- John M.</span>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-900 text-white py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Start Your Journey?</h2>
        <a
          href="/contact"
          className="cta-button bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition-all"
        >
          Contact Us
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 text-center">
        <p>© 2025 The Star Tourism Club. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
