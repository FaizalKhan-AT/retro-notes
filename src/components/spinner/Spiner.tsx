import { FC } from "react";

const Spiner: FC = () => {
  return (
    <span
      className="spinner-border spinner-border"
      role="status"
      aria-hidden="true"
    ></span>
  );
};

export default Spiner;
