
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
    // create newDays, as shallow copy of state.days
    const newDays = [...state.days];

    // get index of day within days array
    const index0fDay = newDays.findIndex(day => day.name === state.day);

    // if interview does not exist (not edited), decrease spots for day by 1
    if (state.appointments[action.value.appointmentId].interview === null) {
      newDays[index0fDay].spots = newDays[index0fDay].spots - 1;
    }

    // return state with updated appointments
    return {
      ...state,
      appointments: action.value.appointments,
      days: newDays
    };
  }
  case DELETE_INTERVIEW: {
    // create newDays object as shallow copy of state.days
    const newDays = [...state.days];
    // get index of day, within days array
    const indexOfDay = newDays.findIndex(day => day.name === state.day);
    
    // create newAppointments as shallow copy of state.appointments
    const newAppointments = {
      ...state.appointments,
      // key into appointments with appointment id
      [action.value.appointmentId]: {
        // set interview objeg to null (delete)
        ...state.appointments[action.value.appointmentId],
        interview: null
      }
    };

    //update spots for day, as spots + 1
    newDays[indexOfDay].spots = newDays[indexOfDay].spots + 1;

    // return state, with newDays and newAppointments
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