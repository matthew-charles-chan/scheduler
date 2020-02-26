/* eslint-disable func-style */

// get all appointments as an array, given a day
export function getAppointmentsForDay(state, day) {
  let output = [];
  // iterate through each day in days
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      // iterate through each appointment
      stateDay.appointments.forEach(appointment => {
        // if appointment exists, push to output array
        if (state.appointments[appointment]) {
          output.push(state.appointments[appointment]);
        }
      });
    }
  });
  return output;
}

// get all interviewers as an array for a given day
export function getInterviewersForDay(state, day) {
  let interviewersArr = [];
  // iterate through days
  state.days.forEach(stateDay => {
    // if day matches given day
    if (stateDay.name === day) {
      // iterate through interviewers for day
      stateDay.interviewers.forEach(interviewer => {
        // push interviewer to output arrray
        interviewersArr.push(state.interviewers[interviewer]);
      });
    }
  });
  return interviewersArr;
}

// get formatted interview object, given interview
export function getInterview(state, interview) {
  let interviewObject = {};
  // if interview does not  exist, return null
  if (!interview) {
    interviewObject = null;
  } else {
    let interviewer = {};
    interviewer.name = state.interviewers[interview.interviewer].name;
    interviewer.id = interview.interviewer;
    interviewer.avatar = state.interviewers[interview.interviewer].avatar;
    
    interviewObject.interviewer = interviewer;
    interviewObject.student = interview.student;
  }
  return interviewObject;
}