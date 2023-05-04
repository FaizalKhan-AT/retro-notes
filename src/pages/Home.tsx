import { FC, useEffect, useState } from "react";
import Card from "../components/cards/Card";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/config";
import { Note } from "../interface/Note";
import Spiner from "../components/spinner/Spiner";
import Search from "../components/search/Search";

const Home: FC = () => {
  const navigate = useNavigate();
  const notesRef = collection(db, "notes");
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchData, setSearchData] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = () => {
    setLoading(true);
    getDocs(notesRef).then((snap) => {
      const data = snap.docs.map((doc) => {
        return { title: doc.data().title, desc: doc.data().desc, id: doc.id };
      });
      setNotes(data);
      setSearchData(data);
      setLoading(false);
    });
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSearch = (str: string) => {
    setNotes(
      searchData.filter((note) => {
        if (note.title.toLocaleLowerCase().includes(str)) return note;
        else if (note.desc.toLocaleLowerCase().includes(str)) return note;
      })
    );
  };
  return (
    <>
      <h1 className="text-center my-2 title position-sticky top-0">
        Retro Notes
      </h1>
      <br />
      <br />
      <Search handleSearch={handleSearch} />
      <br />
      <div className="container d-flex justify-content-center  mt-5">
        {loading ? (
          <Spiner />
        ) : (
          <div className="row justify-content-center w-100 gap-5">
            {notes && notes.length > 0 ? (
              notes.map((note) => (
                <Card fetchData={fetchData} key={note.id} note={note} />
              ))
            ) : (
              <h3 className="error-txt text-center fs-4">
                No notes till now...
              </h3>
            )}
          </div>
        )}
        <button
          onClick={() => navigate("/add")}
          className="btns add p-4 position-fixed bottom-0 mb-4 me-4 end-0 d-flex justify-content-center align-items-center"
        >
          <span
            style={{ fontSize: "3em" }}
            className="material-symbols-outlined fw-bold "
          >
            add
          </span>
        </button>
      </div>
    </>
  );
};

export default Home;
