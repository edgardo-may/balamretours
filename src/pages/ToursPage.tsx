import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import TourList from "../components/TourBooking/TourList";

const ToursPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen pt-12">
      <TourList onSelectTour={(id) => navigate(`/tours/${id}`)} />
    </div>
  );
};

export default ToursPage;
