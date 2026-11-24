// Part 6: a form tied to state.
// Every field is a controlled input: React owns its value. The field shows what is in
// state, and typing changes the state. That is why the two never disagree.

import { useState } from "react";

export default function RsvpForm(props) {
  const { event, onSubmit, onCancel, cancelLabel = "Cancel" } = props;

  // One piece of state per field. The starting value is what the field shows first.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("0");
  const [note, setNote] = useState("");

  // A form submits (and reloads the page) on its own unless we stop it.
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name, email, guests: Number(guests), note });
  }

  return (
    <form className="rsvp-card rsvp-form" onSubmit={handleSubmit} aria-labelledby="rsvp-heading">
      <div>
        <h2 id="rsvp-heading">RSVP to {event.title}</h2>
        <p className="rsvp-intro">
          {event.dateLabel ?? event.weekday}, {event.time}. {event.location}.
        </p>
      </div>

      <div className="field">
        <label htmlFor="rsvp-name">Your name</label>
        <input id="rsvp-name" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </div>

      <div className="field">
        <label htmlFor="rsvp-email">Email</label>
        <p className="hint" id="rsvp-email-hint">We only use it to send your ticket.</p>
        <input id="rsvp-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="rsvp-email-hint" autoComplete="email" />
      </div>

      <div className="field">
        <label htmlFor="rsvp-guests">Guests</label>
        <p className="hint" id="rsvp-guests-hint">How many people you are bringing, not counting you. Up to 3.</p>
        <select id="rsvp-guests" value={guests} onChange={(e) => setGuests(e.target.value)} aria-describedby="rsvp-guests-hint">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="rsvp-note">Note to the host (optional)</label>
        <textarea id="rsvp-note" value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      <div className="rsvp-actions">
        <button type="submit" className="primary-button">Accept Invite</button>
        <button type="button" className="secondary-button" onClick={onCancel}>{cancelLabel}</button>
      </div>
    </form>
  );
}
