export function getAppointmentsForDay(state, day) {
  let output = [];
  state.days.forEach(stateDay => {
    if(stateDay.name === day) {      
      stateDay.appointments.forEach(appointment => {
        if(state.appointments[appointment]){
          output.push(state.appointments[appointment])
        }
      })
    }
  })
  return output;
};