
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const DELETE_INTERVIEW = "DELETE_INTERVIEW";

// eslint-disable-next-line func-style
export default function reducer(state, action) {
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