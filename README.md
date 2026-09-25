# Little Lemon — Table Booking App

A React web app for the Little Lemon restaurant, built as the Meta Front-End
Developer Capstone project. Customers can browse the homepage and book a
table through a validated reservation form.

## Features

- **Home page** with a hero section and call-to-action to book a table.
- **Reservation form** (`/booking`) with controlled inputs for date, time,
  number of guests, and occasion.
- **Client-side validation**: required fields, date can't be in the past,
  guest count must be 1–10, and only currently available time slots are
  accepted. Errors are shown inline and are announced to screen readers
  (`role="alert"`, `aria-describedby`, `aria-invalid`).
- **Dynamic time slots**: changing the date re-fetches the list of
  available times for that day.
- **Confirmation page** (`/confirmed`) shown after a successful booking,
  with a graceful fallback if the page is opened without a booking.
- **Accessible, semantic markup**: `<header>`, `<nav>`, `<main>`, `<footer>`,
  explicit `<label htmlFor>` on every input, and keyboard-navigable links.
- **Responsive layout**: the nav bar and booking form reflow to a single
  column on narrow (mobile) viewports.
- **Unit tests** for the pure time-slot reducer and for the booking form's
  rendering and validation behavior.

## Tech stack

- React 18 (function components + hooks)
- React Router v6
- React Testing Library / Jest (via `react-scripts test`)
- Plain CSS (no framework), using the Little Lemon brand palette

## Project structure

```
src/
  components/
    BookingForm.js       # controlled, validated reservation form
    BookingForm.test.js
    Nav.js
    Footer.js
  pages/
    Home.js
    BookingPage.js        # wires BookingForm to app-level state/routing
    ConfirmedBooking.js
  utils/
    api.js                # fetchAPI / submitAPI (mock — swap for a real API)
  App.js                  # routes + initializeTimes/updateTimes reducer
  App.test.js
  index.js
  index.css
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm

### Installation

```bash
git clone <this-repository-url>
cd little-lemon-capstone
npm install
```

### Run the app locally

```bash
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000).

### Run the unit tests

```bash
npm test
```

Runs Jest in watch mode. Press `a` to run the full suite once, or use
`npm test -- --watchAll=false` for a single non-interactive run (useful in CI).

### Build for production

```bash
npm run build
```

Outputs a static, production-ready bundle to the `build/` folder.

## Notes on the mock API

`src/utils/api.js` stands in for the seed script normally provided by the
course platform. `fetchAPI(date)` returns a deterministic list of time
slots for a given date, and `submitAPI(formData)` always "succeeds" so the
booking flow can be exercised end-to-end without a backend. Replace both
functions with real network calls if you connect this to an actual
reservations service.

## Known limitations / edge cases handled

- Visiting `/confirmed` directly (without completing a booking) shows a
  friendly fallback instead of crashing.
- Selecting a date automatically clears any previously chosen time, since
  the available slots can change per day.
- The submit button stays enabled until first interaction, but validation
  runs on submit and on blur, so the user always gets clear per-field error
  messages before the booking is accepted.
