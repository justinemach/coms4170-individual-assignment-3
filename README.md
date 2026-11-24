# Individual Assignment 3 - React Events

React/Vite implementation for COMS W4170, Fall 2026.

## Run

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. `npm run build` creates the production build. The app uses BrowserRouter: a deployed host must serve index.html for unknown paths.

## Features

- Reusable event cards, list, timeframe switch, and controlled RSVP form.
- Shared event state and immutable updates in App.jsx.
- Events, event details by stable ID, My Events, and not-found routes.
- Invited, Going, Declined, grouped empty states, validation, simulated sending and retry.
- Live status feedback, heading/field/confirmation focus, and focus return when closing details.
- Part 12: attendee count transitions, case-insensitive title search, and no-match feedback.

## Provenance and review status

The foundation is the instructor-supplied 4170_Class17_18_React_code.zip. The first checkpoint starts from Part 8 start (completed Parts 1-7); Codex implemented Part 8 and captured its live page before integrating the supplied Parts 9-11. The Finished solution folder was not used. The final source uses the supplied Part 11 files, with Codex-written Part 12 changes and targeted focus/error fixes. This is not a claim that the student independently completed the earlier checkpoints.

The assignment specifically requires Part 12 code and its note to be the student's own work. The current Part 12 code is an AI-written review draft; reading or submitting it unchanged does not establish independent authorship. Complete that portion yourself within the course rules, and write the note from your own work and observations.

The Part 8 checkpoint is preserved in the `part-8-checkpoint` Git tag. Evidence includes the original browser screenshot captured before Parts 9-11 and a later editor-plus-preview view of that preserved checkpoint. The final PDF explains the timing of both captures. No Gradescope submission has been made.

## Verification

See TEST_RECORD.txt for tests performed by Codex. The production build, validation/search checks, and responsive checks at 320, 390, 720 and 1280 pixels passed. Keyboard focus and live-region text were inspected. Spoken screen-reader output was not independently verified. No claim is made that the student personally performed these checks.

Run `node scripts/check-behavior.mjs` to verify validation boundaries, search cases, stable IDs and the default data-loader configuration.

## Simulated states

- RSVP failure: enter a fictional email ending in @fail.test. Correct the address and retry.
- Data failure/empty: edit SIMULATE_FAILURE or SIMULATE_EMPTY in src/data/loadEvents.js, then reload. Restore both to false afterward.
- Data resets to the fictional starting events on a full reload. There is no backend or persistence.

## File map

- src/App.jsx: shared state, routes, status updates, and search predicate.
- src/components/: EventCard, EventList, ViewSwitch, RsvpForm.
- src/pages/: EventsPage, EventDetails, MyEvents, NotFound.
- src/data/events.js: supplied fictional events; loadEvents.js: simulated data loading.
- src/styles.css: supplied responsive stylesheet plus small additions.

Discover, Create Event, notifications, and profile remain the course's decorative scaffold links. They are outside the graded assignment's three routes.
