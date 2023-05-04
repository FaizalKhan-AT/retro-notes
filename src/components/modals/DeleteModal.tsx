import { FC } from "react";
import Spiner from "../spinner/Spiner";
interface Props {
  handleOpen: () => void;
  handleDelete: () => void;
  loading: boolean;
}
const DeleteModal: FC<Props> = ({ handleOpen, handleDelete, loading }) => {
  return (
    <>
      <div className="w-100 position-absolute">
        <div className="overlay position-fixed start-0 end-0 top-0 bottom-0"></div>
        <div className="del-modal py-3 px-3 position-fixed top-50 start-50 translate-middle">
          <div className="d-flex w-100 align-items-center m-3 justify-content-between">
            <div className="error-txt fs-5">Delete note </div>
            <div
              onClick={handleOpen}
              style={{ cursor: "pointer" }}
              className="error-txt fs-5 me-2"
            >
              [X]
            </div>
          </div>
          <div className="text-center d-flex flex-column align-items-center gap-3 error-txt my-3 mt-5">
            Are you sure to delete this note ?{loading ? <Spiner /> : ""}
          </div>
          <br />
          <div className="d-flex align-items-center justify-content-center mt-1 gap-3 my-2">
            <button className="btns p-2" onClick={handleDelete}>
              Yes
            </button>
            <button className="btns p-2" onClick={handleOpen}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
