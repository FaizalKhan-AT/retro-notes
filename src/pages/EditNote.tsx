import { FC, useState } from "react";
import Form from "../components/Form/Form";
import { Note } from "../interface/Note";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/config";
import { useNavigate } from "react-router-dom";

const EditNote: FC = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleEditNote = (note: Note) => {
    setLoading(true);
    const notesRef = doc(db, "notes", note.id as string);
    updateDoc(notesRef, { title: note.title, desc: note.desc })
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };
  return (
    <>
      <h1 className="text-center my-2 title position-sticky top-0">
        Edit Note
      </h1>
      <br />
      <div className="container d-flex justify-content-center">
        <Form
          edit={true}
          error={error}
          loading={loading}
          setError={setError}
          handleFormSubmit={handleEditNote}
        />
      </div>
    </>
  );
};

export default EditNote;
