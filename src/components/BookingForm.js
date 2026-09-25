import React, { useState } from "react";
import PropTypes from "prop-types";

const today = () => new Date().toISOString().split("T")[0];

const initialState = {
  date: today(),
  time: "",
  guests: 2,
  occasion: "Birthday",
};

/**
 * Controlled, validated table-booking form.
 *
 * Validation rules:
 *  - date: required, cannot be in the past
 *  - time: required, must be one of the currently available slots
 *  - guests: required, integer between 1 and 10
 *  - occasion: required
 *
 * Accessibility: every field has an explicit <label htmlFor>, invalid
 * fields get aria-invalid + aria-describedby pointing at their error
 * message, and the submit button is disabled (with an explanatory message)
 * until the form is valid.
 */
function BookingForm({ availableTimes, updateTimes, submitForm }) {
  const [formData, setFormData] = useState(initialState);
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState("");

  const validate = (data) => {
    const errors = {};

    if (!data.date) {
      errors.date = "Please choose a date.";
    } else if (data.date < today()) {
      errors.date = "The date can't be in the past.";
    }

    if (!data.time) {
      errors.time = "Please choose a time.";
    } else if (!availableTimes.includes(data.time)) {
      errors.time = "That time is no longer available — please pick another.";
    }

    const guestsNum = Number(data.guests);
    if (!data.guests || Number.isNaN(guestsNum)) {
      errors.guests = "Please enter the number of guests.";
    } else if (guestsNum < 1 || guestsNum > 10) {
      errors.guests = "Number of guests must be between 1 and 10.";
    }

    if (!data.occasion) {
      errors.occasion = "Please select an occasion.";
    }

    return errors;
  };

  const errors = validate(formData);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    if (name === "date") {
      updateTimes(value);
      // Reset the chosen time since the available slots just changed.
      setFormData((prev) => ({ ...prev, date: value, time: "" }));
    }
  };

  const handleBlur = (event) => {
    setTouched((prev) => ({ ...prev, [event.target.name]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ date: true, time: true, guests: true, occasion: true });
    setSubmitError("");

    if (!isValid) {
      return;
    }

    const success = submitForm(formData);
    if (!success) {
      setSubmitError(
        "Sorry, we couldn't complete your booking. Please try again."
      );
    }
  };

  const fieldError = (field) =>
    touched[field] && errors[field] ? (
      <span className="error-message" id={`${field}-error`} role="alert">
        {errors[field]}
      </span>
    ) : null;

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Table reservation form"
    >
      <div className="form-field">
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          name="date"
          min={today()}
          value={formData.date}
          onChange={handleChange}
          onBlur={handleBlur}
          data-touched={touched.date ? "true" : "false"}
          aria-invalid={Boolean(touched.date && errors.date)}
          aria-describedby={errors.date ? "date-error" : undefined}
          required
        />
        {fieldError("date")}
      </div>

      <div className="form-field">
        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          onBlur={handleBlur}
          data-touched={touched.time ? "true" : "false"}
          aria-invalid={Boolean(touched.time && errors.time)}
          aria-describedby={errors.time ? "time-error" : undefined}
          required
        >
          <option value="">Select a time</option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        {fieldError("time")}
      </div>

      <div className="form-field">
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="10"
          value={formData.guests}
          onChange={handleChange}
          onBlur={handleBlur}
          data-touched={touched.guests ? "true" : "false"}
          aria-invalid={Boolean(touched.guests && errors.guests)}
          aria-describedby={errors.guests ? "guests-error" : undefined}
          required
        />
        {fieldError("guests")}
      </div>

      <div className="form-field">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          onBlur={handleBlur}
          data-touched={touched.occasion ? "true" : "false"}
          aria-invalid={Boolean(touched.occasion && errors.occasion)}
          aria-describedby={errors.occasion ? "occasion-error" : undefined}
          required
        >
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Other">Other</option>
        </select>
        {fieldError("occasion")}
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn"
          disabled={!isValid && Object.keys(touched).length > 0}
          aria-label="Reserve a table with the details above"
        >
          Reserve Table
        </button>
        {submitError && (
          <p className="error-message" role="alert">
            {submitError}
          </p>
        )}
      </div>
    </form>
  );
}

BookingForm.propTypes = {
  availableTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateTimes: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};

export default BookingForm;
