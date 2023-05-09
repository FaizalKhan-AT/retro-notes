import { FC, useContext, useState } from "react";
import { Note } from "../../interface/Note";
import { NoteEdit, NoteType } from "../../contexts/EditContext";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../modals/DeleteModal";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/config";
interface Props {
  note: Note;
  fetchData: () => void;
}
const Card: FC<Props> = ({ note, fetchData }) => {
  const { setNote } = useContext(NoteEdit) as NoteType;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [delId, setDelId] = useState<string>("");
  const navigate = useNavigate();
  const handleEdit = () => {
    setNote(note);
    navigate("/edit");
  };
  const handleOpenModal = () => setOpenModal(!openModal);
  const handleDel = (id: string) => {
    setDelId(id);
    handleOpenModal();
  };
  const handleDeleteNote = () => {
    setLoading(true);
    const docRef = doc(db, "notes", delId);
    deleteDoc(docRef)
      .then(() => {
        handleOpenModal();
        fetchData();
      })
      .catch((err) => {
        setLoading(false);
        handleOpenModal();
      });
  };
  return (
    <>
      {openModal ? (
        <DeleteModal
          loading={loading}
          handleDelete={handleDeleteNote}
          handleOpen={handleOpenModal}
        />
      ) : (
        ""
      )}
      <div
        style={{ overflowWrap: "break-word" }}
        className="card-note col-md-5 py-3 d-flex flex-column justify-content-between"
      >
        <span className="d-flex flex-column gap-2">
          <h4 className="card-head py-1 text-wrap">{note.title}</h4>
          <p className="card-body">{note.desc}</p>
        </span>
        <div className="d-flex align-items-center gap-3 my-2">
          <button onClick={handleEdit} className="btns p-2">
            Edit
          </button>
          <button
            onClick={() => handleDel(note.id as string)}
            className="btns p-2"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
