import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ConfirmedBooking({ booking }) {
  if (!booking) {
    return (
      <section className="confirmed-section" aria-labelledby="no-booking-heading">
        <h1 id="no-booking-heading">No booking found</h1>
        <p>
          It looks like you haven't made a reservation yet, or the page was
          reloaded and the details were lost.
        </p>
        <Link to="/booking" className="btn">
          Book a Table
        </Link>
      </section>
    );
  }

  return (
    <section className="confirmed-section" aria-labelledby="confirmed-heading">
      <h1 id="confirmed-heading">You're booked in!</h1>
      <p>
        Table for {booking.guests} on {booking.date} at {booking.time} —
        occasion: {booking.occasion}.
      </p>
      <Link to="/" className="btn">
        Back to Home
      </Link>
    </section>
  );
}

ConfirmedBooking.propTypes = {
  booking: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
    guests: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    occasion: PropTypes.string,
  }),
};

ConfirmedBooking.defaultProps = {
  booking: null,
};

export default ConfirmedBooking;
