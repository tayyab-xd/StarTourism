import { useState, createContext, useReducer, useEffect } from "react"
import axios from "axios"
import { reducer } from "./reducer"

const AppContext = createContext();

const AppProvider = ({ children }) => {

  const initialState = {
    allTrips: [],
    profileData: {},
    applications:[],
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  // searching for trips
  useEffect(() => {
    const fetchtrips = async () => {
      const trips = await axios.get('http://localhost:3000/trip/all-trips')
      dispatch({ type: 'SET_TRIPS', payload: trips.data })
    }
    fetchtrips()
  }, [])


  //set profile
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem('startourism'));
      if (!storedUser) return;
      try {
        const res = await axios.get(`http://localhost:3000/user/getuser/${storedUser.userId}`);
        dispatch({ type: 'PROFILE_SET', payload: res.data.user });
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, [localStorage.getItem('startourism')]);
  
  //for application
  useEffect(() => {
    const fetchApplications=async()=>{
      const res=await axios.get('http://localhost:3000/application/all-applications')
      dispatch({type:'SET_APPLICATIONS',payload:res.data})
    }
    fetchApplications()
  }, [])
  

  return (
    <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
  )
}

export { AppContext, AppProvider };