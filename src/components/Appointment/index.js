import React from "react";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const create = () => {
    transition(CREATE)
  }

  const cancel = () => {
    back()
  }


  
  const interviewers = [];
    return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={create} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />)}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={ cancel }
        />)}
    </article>
  );
}

// {props.interview ? <Show student={props.interview.student} interviewer={ props.interview.interviewer } /> : <Empty />}