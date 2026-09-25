import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";

function BookingPage({ availableTimes, updateTimes, submitBooking }) {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    const success = submitBooking(formData);
    if (success) {
      navigate("/confirmed");
    }
    return success;
  };

  return (
    <section className="booking-section" aria-labelledby="booking-heading">
      <div className="container">
        <h1 id="booking-heading">Reserve a Table</h1>
        <BookingForm
          availableTimes={availableTimes}
          updateTimes={updateTimes}
          submitForm={handleSubmit}
        />
      </div>
    </section>
  );
}

BookingPage.propTypes = {
  availableTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateTimes: PropTypes.func.isRequired,
  submitBooking: PropTypes.func.isRequired,
};

export default BookingPage;
