/* eslint-disable func-style */
import { useReducer, useEffect } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  DELETE_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {
  const [state,  dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => {
    dispatch({type: SET_DAY, value: day});
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]:appointment
    };
    
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => dispatch({type: SET_INTERVIEW, value: {appointments, appointmentId: id}})
      );
  }
  
  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatch({type: DELETE_INTERVIEW, value: { appointmentId: id }}));
  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then(all => all.map(e => e.data))
      .then(([days, appointments, interviewers]) => {
        dispatch({type: SET_APPLICATION_DATA, value: {days, appointments, interviewers}});
      }
      );
  },[]);


  return { state, setDay, bookInterview, deleteInterview};
}

