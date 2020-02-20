import React from "react";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Saving from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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

  const confirm = () => {
    transition(CONFIRM);
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

  const destroy = () => {
    transition(SAVING)
    props.deleteInterview(props.id).then(() => {
      transition(EMPTY)
    })
  }

  const edit = () => {
    const interviewer = props.interviewer
    // const name = props.
    transition(EDIT)
  }

    return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={create} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = { confirm }
          onEdit = { edit }
        />)}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={ props.interview.interviewer.id}
          onCancel = {cancel}
          onSave = { save }
        />)}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={ cancel } onSave={ save }
        />)}
      {mode === SAVING && <Saving message="Saving"/>}
      {mode === CONFIRM && <Confirm onCancel = { cancel } onConfirm ={ destroy } />}
    </article>
  );
}

// {props.interview ? <Show student={props.interview.student} interviewer={ props.interview.interviewer } /> : <Empty />}