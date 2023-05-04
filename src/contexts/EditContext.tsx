import { FC, useState, createContext } from "react";
import { Note } from "../interface/Note";
export interface NoteType {
  note: Note | null;
  setNote: React.Dispatch<React.SetStateAction<Note | null>>;
}
export const NoteEdit = createContext<NoteType | null>(null);
interface Props {
  children: React.ReactNode;
}
const EditContext: FC<Props> = ({ children }) => {
  const [note, setNote] = useState<Note | null>(null);
  return (
    <NoteEdit.Provider value={{ note, setNote }}>{children}</NoteEdit.Provider>
  );
};

export default EditContext;
