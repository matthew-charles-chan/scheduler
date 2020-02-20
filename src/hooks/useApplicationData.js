import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {


  const [state,  setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  const setDay = day => {
    setState(prev => ({...prev, day}))
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
      .then(() => setState({
        ...state,
        appointments
      })
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
        setState(prev => ({...prev, days, appointments, interviewers}))
      }
    );
  },[])

  return {state, setDay, bookInterview, deleteInterview}
}