import { initializeTimes, updateTimes } from "./App";

describe("initializeTimes", () => {
  test("returns a non-empty array of time strings", () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
    times.forEach((t) => expect(t).toMatch(/^\d{2}:\d{2}$/));
  });
});

describe("updateTimes reducer", () => {
  test("returns a new array of times for UPDATE_TIMES action", () => {
    const state = initializeTimes();
    const result = updateTimes(state, {
      type: "UPDATE_TIMES",
      date: "2026-12-25",
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  test("returns unchanged state for an unknown action type", () => {
    const state = ["17:00", "18:00"];
    const result = updateTimes(state, { type: "NOT_A_REAL_ACTION" });
    expect(result).toBe(state);
  });
});
