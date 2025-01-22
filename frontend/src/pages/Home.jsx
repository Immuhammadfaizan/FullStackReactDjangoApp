import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const res = await api.get("/api/notes/");
      const data = Array.isArray(res.data) ? res.data : res.data.results; // Adjust based on the API response
      setNotes(data);
    } catch (err) {
      alert("Failed to fetch notes:", err);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}/`);
      if (res.status === 204) {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        alert("Note deleted successfully!");
      } else {
        alert("Failed to delete the note. Please try again.");
      }
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Error deleting note. Please try again later.");
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and Content are required!");
      return;
    }

    try {
      const res = await api.post("/api/notes/", { title, content });
      if (res.status === 201) {
        alert("Note created successfully!");
        setTitle("");
        setContent("");
        // Fetch updated notes after creation
        getNotes();
      } else {
        alert("Something went wrong...");
      }
    } catch (err) {
      alert("Error creating note:", err);
    }
  };

  return (
    <div>
      <h2>Notes</h2>
      {notes && notes.length > 0 ? (
        notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))
      ) : (
        <p>No notes available. Create a new note!</p>
      )}

      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
