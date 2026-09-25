// Mock API layer standing in for the seed script normally injected by the
// course platform (window.fetchAPI / window.submitAPI). Swap the bodies of
// these two functions for real network calls if you wire up a backend.

/**
 * Returns the list of available reservation times for a given date.
 * A real implementation would call a backend endpoint; here we derive a
 * pseudo-random-but-deterministic list from the date so the UI has
 * something meaningful to render.
 * @param {Date} date
 * @returns {string[]} array of "HH:MM" time strings
 */
export function fetchAPI(date) {
  const baseTimes = [
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ];

  // Vary availability slightly by day-of-month so different dates show
  // different slots (purely cosmetic — replace with a real API call).
  const seed = date instanceof Date ? date.getDate() : 1;
  return baseTimes.filter((_, index) => (index + seed) % 4 !== 0);
}

/**
 * Simulates submitting a booking to a backend.
 * @param {Object} formData
 * @returns {boolean} true if the booking was "accepted"
 */
export function submitAPI(formData) {
  // Always succeed for the purposes of this demo/capstone project.
  return Boolean(formData);
}
