import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment"

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";



export default function Application(props) {

  const [state,  setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState(prev => ({ ...prev, day}));


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]:appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments
      })
    })
  }

  function deleteInterview(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
  }

  console.log(state);
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

  const appointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day)

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={ appointment.id }
        id={ appointment.id }
        time={ appointment.time }
        interview={ interview }
        interviewers={ interviewers }
        bookInterview={ bookInterview }
        deleteInterview={ deleteInterview }      
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {
          schedule
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
