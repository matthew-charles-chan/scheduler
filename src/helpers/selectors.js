/* eslint-disable func-style */
export function getAppointmentsForDay(state, day) {
  let output = [];
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.appointments.forEach(appointment => {
        if (state.appointments[appointment]) {
          output.push(state.appointments[appointment]);
        }
      });
    }
  });
  return output;
}


export function getInterviewersForDay(state, day) {
  let interviewersArr = [];
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.interviewers.forEach(interviewer => {
        interviewersArr.push(state.interviewers[interviewer]);
      });
    }
  });
  return interviewersArr;
}
  
export function getInterview(state, interview) {
  let interviewObject = {};
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
  
// const name = state.interviewers[interview.interviewer].name;
// const id = interview.interviewer
// const avatar = state.interviewers[interview.interviewer].avatar

// interviewer = {name, id, avatar}
  
// obj = {interviewer, student }