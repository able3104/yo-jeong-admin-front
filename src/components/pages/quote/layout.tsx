import { Outlet } from "react-router-dom";
import EditPriceModal from "./editPriceModal";

const QuoteLayout = () => {
  return (
    <>
      <Outlet />
      <EditPriceModal />
    </>
  );
};

export default QuoteLayout;
