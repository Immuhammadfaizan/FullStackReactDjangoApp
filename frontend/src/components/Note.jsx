import PropTypes from "prop-types";
import "../styles/Note.css";

function Note({ note, onDelete }) {
  // Fallback for missing or invalid date
  const formattedDate = note.created_at
    ? new Date(note.created_at).toLocaleDateString("en-US")
    : "Unknown Date";

  return (
    <div className="note-container">
      <h3 className="note-title">{note.title || "Untitled Note"}</h3>
      <p className="note-content">{note.content || "No content available."}</p>
      <p className="note-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Note;
