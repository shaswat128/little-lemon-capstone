import React, { useReducer, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookingPage from "./pages/BookingPage";
import ConfirmedBooking from "./pages/ConfirmedBooking";
import { fetchAPI, submitAPI } from "./utils/api";

/**
 * Pure reducer initializer: returns the times available "today".
 * Exported so it can be unit tested in isolation.
 */
export const initializeTimes = () => fetchAPI(new Date());

/**
 * Pure reducer: given the current list of times and an action carrying a
 * new date, returns the times available for that date. Kept as a pure
 * function (no side effects) so it is easy to unit test.
 * @param {string[]} state
 * @param {{ type: string, date: string }} action
 */
export function updateTimes(state, action) {
  switch (action.type) {
    case "UPDATE_TIMES": {
      const newDate = action.date ? new Date(action.date) : new Date();
      return fetchAPI(newDate);
    }
    default:
      return state;
  }
}

function App() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  const updateAvailableTimes = (date) => {
    dispatch({ type: "UPDATE_TIMES", date });
  };

  const submitBooking = (formData) => {
    const success = submitAPI(formData);
    if (success) {
      setBookingConfirmed(formData);
    }
    return success;
  };

  return (
    <div className="App">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/booking"
            element={
              <BookingPage
                availableTimes={availableTimes}
                updateTimes={updateAvailableTimes}
                submitBooking={submitBooking}
              />
            }
          />
          <Route
            path="/confirmed"
            element={<ConfirmedBooking booking={bookingConfirmed} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
