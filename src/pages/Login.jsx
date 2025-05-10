import React, { useContext, useState } from 'react';
import axios from 'axios';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const context = useContext(AppContext);
  const dispatch = context.dispatch;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/user/Login', formData)
      .then((response) => {
        localStorage.setItem('startourism', JSON.stringify(response.data));
        console.log(response.data);
        navigate(from);
        dispatch({ type: 'PROFILE_SET', payload: response.data });
        setError('Login Successful');
      })
      .catch((error) => {
        setError('Login Failed');
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full sm:w-96">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-700 dark:text-gray-300">Don't have an account?</p>
          <NavLink
            to={'/signup'}
            className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none transition duration-300"
          >
            Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
