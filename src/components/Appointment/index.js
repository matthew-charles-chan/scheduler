import React from "react";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Saving from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const create = () => {
    transition(CREATE);
  };

  const cancel = () => {
    back();
  };

  const confirm = () => {
    transition(CONFIRM);
  };

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const destroy = () => {
    transition(SAVING, true);
    props
      .deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  const edit = () => {
    transition(EDIT);
  };

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
      {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={ cancel } />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={ cancel } />}
    </article>
  );
}

// {props.interview ? <Show student={props.interview.student} interviewer={ props.interview.interviewer } /> : <Empty />}