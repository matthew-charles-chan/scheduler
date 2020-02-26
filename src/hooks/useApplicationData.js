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

  // books interview (updates state with new interview), given an interview object
  function bookInterview(id, interview) {

    // creates new appointment object with new interview object
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    // creates appointments object, as shallow copy of state.appoinments with new appointment, keyed by id
    const appointments = {
      ...state.appointments,
      [id]:appointment
    };
    
    // axios put request to update server with new appointments
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => dispatch({type: SET_INTERVIEW, value: {appointments, appointmentId: id}})
      );
  }
  
  // axios delete request, to destroy appointment for a given appointment.id
  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatch({type: DELETE_INTERVIEW, value: { appointmentId: id }}));
  }

  // on load, amake axios requests to get days, appoinments and interviewers
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    // on resolution of all promises, map through response to get only the data for each
    ]).then(all => all.map(e => e.data))
      // destructure datys, appointments and interviewers with new data
      .then(([days, appointments, interviewers]) => {
        // set application data with the resolved data values
        dispatch({type: SET_APPLICATION_DATA, value: {days, appointments, interviewers}});
      }
      );
  },[]);


  return { state, setDay, bookInterview, deleteInterview};
}

