/* eslint-disable func-style */
import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const DELETE_INTERVIEW = "DELETE_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
  case SET_DAY:
    return {
      ...state,
      day: action.value
    };
  case SET_APPLICATION_DATA:
    return {
      ...state,
      days: action.value.days,
      appointments: action.value.appointments,
      interviewers: action.value.interviewers
    };
  case SET_INTERVIEW: {
    const newDays = [...state.days];
    const index0fDay = newDays.findIndex(day => day.name === state.day);

    if (state.appointments[action.value.appointmentId].interview === null) {
      newDays[index0fDay].spots = newDays[index0fDay].spots - 1;
    }

    return {
      ...state,
      appointments: action.value.appointments,
      days: newDays
    };
  }
  case DELETE_INTERVIEW: {
    const newDays = [...state.days];
    const indexOfDay = newDays.findIndex(day => day.name === state.day);
      
    const newAppointments = {
      ...state.appointments,
      [action.value.appointmentId]: {
        ...state.appointments[action.value.appointmentId],
        interview: null
      }
    };

    newDays[indexOfDay].spots = newDays[indexOfDay].spots + 1;

    return {
      ...state,
      appointments: newAppointments,
      days: newDays
    };
  }
  default:
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  }
}

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
    
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => dispatch({type: SET_INTERVIEW, value: {appointments, appointmentId: id}})
      );
  }
  
  function deleteInterview(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
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

