import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookingForm from "./BookingForm";

const availableTimes = ["17:00", "18:00", "19:00"];

function setup(overrideProps = {}) {
  const updateTimes = jest.fn();
  const submitForm = jest.fn(() => true);
  render(
    <BookingForm
      availableTimes={availableTimes}
      updateTimes={updateTimes}
      submitForm={submitForm}
      {...overrideProps}
    />
  );
  return { updateTimes, submitForm };
}

test("renders all expected form fields with accessible labels", () => {
  setup();
  expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /reserve a table/i })
  ).toBeInTheDocument();
});

test("populates the time select with the availableTimes prop", () => {
  setup();
  availableTimes.forEach((time) => {
    expect(
      screen.getByRole("option", { name: time })
    ).toBeInTheDocument();
  });
});

test("shows a validation error when guests is out of range", () => {
  setup();
  const guestsInput = screen.getByLabelText(/number of guests/i);
  fireEvent.change(guestsInput, { target: { value: "15" } });
  fireEvent.blur(guestsInput);
  expect(
    screen.getByText(/number of guests must be between 1 and 10/i)
  ).toBeInTheDocument();
});

test("calls submitForm with form data when the form is valid", () => {
  const { submitForm } = setup();

  fireEvent.change(screen.getByLabelText(/choose time/i), {
    target: { value: "18:00" },
  });
  fireEvent.change(screen.getByLabelText(/number of guests/i), {
    target: { value: "4" },
  });
  fireEvent.change(screen.getByLabelText(/occasion/i), {
    target: { value: "Anniversary" },
  });

  fireEvent.submit(screen.getByRole("button", { name: /reserve a table/i }));

  expect(submitForm).toHaveBeenCalledTimes(1);
  expect(submitForm).toHaveBeenCalledWith(
    expect.objectContaining({ time: "18:00", guests: "4", occasion: "Anniversary" })
  );
});
