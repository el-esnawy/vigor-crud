import "./App.css";
import axios from "axios";
import React from "react";
import Note from "./Note";

const api = "http://localhost:5000";

function App() {
  const [newNote, setNewNote] = React.useState({ content: "", done: false });
  const [allNotes, setAllNotes] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(api + "/api/notes");
      console.log(data);
      setAllNotes(data.data);
    };
    fetchData();
  }, []);

  const changeHandler = (e) => {
    setNewNote({ ...newNote, content: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(api + "/api/notes", { ...newNote });
    setAllNotes([...allNotes, newNote]);
  };

  return (
    <div className="container">
      <h1>To-DO App</h1>
      <h2>Enter a new Item</h2>
      <form onSubmit={submitHandler} style={{ marginBottom: "50px" }}>
        <input type="text" onChange={changeHandler} value={newNote.content} />
        <button type="submit">Add</button>
      </form>

      {allNotes.map((note) => {
        return (
          <div key={note._id} style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <Note id={note._id} content={note.content} done={note.done} />
          </div>
        );
      })}

      {}
    </div>
  );
}

export default App;
