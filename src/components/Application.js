import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment"

import { getAppointmentsForDay } from "helpers/selectors";



export default function Application(props) {

  const [state,  setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  const setDays = days => setState(prev => ({...prev, days}));
  const setDay = day => setState(prev => ({ ...prev, day }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));
  
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`http://localhost:8001/api/days`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/appointments`)),
      // Promise.resolve("third"),
    ]).then((all) => {
      setDays(all[0].data)
      setAppointments(all[1].data)
    });
  },[])

  const appointments = getAppointmentsForDay(state, state.day)

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
          appointments.map((appointment) => 
            <Appointment key={appointment.id}{...appointment}/>
          )
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
