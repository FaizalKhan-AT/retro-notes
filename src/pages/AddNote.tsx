import { FC, useState } from "react";
import Form from "../components/Form/Form";
import { Note } from "../interface/Note";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase/config";
import { useNavigate } from "react-router-dom";
const AddNote: FC = () => {
  const navigate = useNavigate();
  const notesRef = collection(db, "notes");
  const handleAddNote = (note: Note) => {
    setLoading(true);
    const qu = query(notesRef, where("title", "==", note.title));
    getDocs(qu).then((snap) => {
      const [d] = snap.docs.map((doc) => {
        return { ...doc.data(), docid: doc.id };
      });
      if (d) {
        setError("Note with same title already exists... please try again");
        setLoading(false);
        return;
      } else {
        addDoc(notesRef, note)
          .then(() => {
            setLoading(false);
            navigate("/");
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      }
    });
  };
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      <h1 className="text-center my-2 title position-sticky top-0">Add Note</h1>
      <br />
      <div className="container d-flex justify-content-center">
        <Form
          error={error}
          loading={loading}
          setError={setError}
          handleFormSubmit={handleAddNote}
        />
      </div>
    </>
  );
};

export default AddNote;
