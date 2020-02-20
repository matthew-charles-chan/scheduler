import React from "react";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Saving from "components/Appointment/Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

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

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW)
    })
  }

  
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
        <Form interviewers={props.interviewers} onCancel={ cancel } onSave={ save }
        />)}
      {mode === SAVING && <Saving message="Saving"/>}
    </article>
  );
}

// {props.interview ? <Show student={props.interview.student} interviewer={ props.interview.interviewer } /> : <Empty />}