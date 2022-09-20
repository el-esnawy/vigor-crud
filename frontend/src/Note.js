import axios from "axios";
import React from "react";

const api = "http://localhost:5000";

const Note = ({ id, content, done }) => {
  const [noteContent, setNoteContent] = React.useState(content);
  const [isDone, setisDone] = React.useState(done);
  const [editMode, setEditMode] = React.useState(false);

  const onEdit = () => {
    setEditMode(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setEditMode(false);
    axios.put(`${api}/api/notes/${id}`, { content: noteContent, done: isDone });
    window.location.reload();
  };

  const changeHandler = (e) => {
    setNoteContent(e.target.value);
  };

  const onDone = () => {
    axios.put(`${api}/api/notes/${id}`, { content: noteContent, done: !isDone });
    setisDone((prevState) => !prevState);
    window.location.reload();
  };

  const deleteHandler = () => {
    window.location.reload();
    axios.delete(`${api}/api/notes/${id}`);
  };
  return (
    <div
      key={id || Math.random()}
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "400px" }}>
      {!editMode && (
        <h6
          style={{
            textDecoration: isDone ? "line-through" : "none",
            color: isDone ? "red" : "black",
            fontWeight: "bold",
            fontSize: "18px",
          }}>
          {" "}
          {content}
        </h6>
      )}
      {editMode && (
        <form onSubmit={submitHandler}>
          <input type="text" onChange={changeHandler} value={noteContent} />
          <button type="submit">Submit</button>
        </form>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", width: "10%" }}>
        <button onClick={() => onEdit()}>Edit</button>
        <button onClick={onDone}>{isDone ? "undone" : "Done"}</button>
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
};

export default Note;
