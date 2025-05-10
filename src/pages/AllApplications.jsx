import React, { useContext } from 'react';
import { AppContext } from '../context/context';

function AllApplications() {
  const context = useContext(AppContext);
  const data = context.state?.applications;
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 sm:px-10 transition-colors duration-500">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        All Trip Applications
      </h1>

      {data && data.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.slice().reverse().map((item, i) => (
            <div
              key={i}
              className="application-card bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 transition-all hover:shadow-2xl hover:-translate-y-2 hover:scale-105 animate-fade-in"
            >
              <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Application #{data.length - i}
              </h2>

              {/* 👇 Date and Time */}
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 italic">
                {new Date(item.createdAt).toLocaleString()}
              </p>

              <p className="mb-2 text-gray-700 dark:text-gray-300">
                <strong>Destination:</strong> {item.destination}
              </p>
              <p className="mb-2 text-gray-700 dark:text-gray-300">
                <strong>Days:</strong> {item.days}
              </p>
              <p className="mb-2 text-gray-700 dark:text-gray-300">
                <strong>Travelers:</strong> {item.persons}
              </p>
              <p className="mb-2 text-gray-700 dark:text-gray-300">
                <strong>Trip Type:</strong> {item.tripType.join(', ')}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Requests:</strong> {item.message || 'None'}
              </p>
            </div>
          ))}

        </div>
      ) : (
        <h2 className="text-xl text-center text-gray-600 dark:text-gray-300">No applications yet</h2>
      )}
    </div>
  );
}

export default AllApplications;
