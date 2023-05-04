import React, { FC, FormEvent, useContext, useState } from "react";
import { Note } from "../../interface/Note";
import Spiner from "../spinner/Spiner";
import { NoteEdit, NoteType } from "../../contexts/EditContext";
interface Props {
  handleFormSubmit: (note: Note) => void;
  edit?: boolean;
  error: string;
  loading: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
}
const Form: FC<Props> = ({
  handleFormSubmit,
  error,
  setError,
  loading,
  edit,
}) => {
  const { note } = useContext(NoteEdit) as NoteType;
  const [formData, setFormData] = useState<Note>(
    edit
      ? (note as Note)
      : {
          title: "",
          desc: "",
        }
  );
  const validate = () => {
    const { title, desc } = formData;
    if (title === "") {
      setError("Title field cannot be empty in a note...");
      return false;
    }
    if (desc === "" && title.length < 10) {
      setError("Description required for notes with title length less than 10");
      return false;
    }
    setError("");
    return true;
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) handleFormSubmit(formData);
  };
  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="row w-100 my-5 justify-content-center gap-5"
    >
      <div className="col-md-8">
        <label className="form-label">Title:</label>
        <input
          value={formData.title}
          onChange={handleChange}
          type="text"
          name="title"
          className="input w-100"
          placeholder="add note"
        />
      </div>
      <div className="col-md-8">
        <label className="form-label">Description:</label>
        <textarea
          rows={7}
          value={formData.desc}
          name="desc"
          onChange={handleChange}
          className="input ta w-100"
          placeholder="add description"
        ></textarea>
      </div>
      {error ? (
        <div className="col-md-8">
          <div className="text-danger error-txt">{error ? error : ""}</div>
        </div>
      ) : (
        ""
      )}
      <div className="col-md-8 d-flex justify-content-center">
        <button
          type="submit"
          style={{ width: "140px", height: "50px" }}
          className="btns p-2 fs-5 d-flex align-items-center justify-content-center"
        >
          {loading ? <Spiner /> : edit ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default Form;
