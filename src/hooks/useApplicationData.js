import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA= "SET_APPLICATION_DATA";;
  const SET_INTERVIEW = "SET_INTERVIEW";
  
  const [state,  dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { 
          ...state,
          day: action.value
         }
      case SET_APPLICATION_DATA:
        return { 
          ...state,
          days: action.value.days,
          appointments: action.value.appointments,
          interviewers: action.value.interviewers
        }
      case SET_INTERVIEW: {
        return {
          ...state,
          appointments: action.value
        }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }


  const setDay = day => {
    dispatch({type: SET_DAY, value: day})
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]:appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => dispatch({type: SET_INTERVIEW, value: appointments})
    )
  };
  
  function deleteInterview(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
  }; 

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then(all => all.map(e => e.data))
      .then(([days, appointments, interviewers]) => {
        dispatch({type: SET_APPLICATION_DATA, value: {days: days, appointments: appointments, interviewers: interviewers}})
      }
    );
  },[])



  return {state, setDay, bookInterview, deleteInterview}
}