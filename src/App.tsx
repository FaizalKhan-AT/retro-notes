// App coded by Faizal Khan - github - FaizalKhan-AT
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddNote />} />
      <Route path="/edit" element={<EditNote />} />
    </Routes>
  );
};

export default App;
