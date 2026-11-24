// Part 11: the Events page shows one of four things, depending on loadState:
// a loading message, an empty message, an error with Try again, or the list.

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import EventList from "../components/EventList.jsx";
import ViewSwitch from "../components/ViewSwitch.jsx";

export default function EventsPage(props) {
  const { events, view, onViewChange, onStatusChange, loadState, onRetry, query, onQueryChange } = props;

  const mainRef = useRef(null);
  const headingRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (loadState === "loading") return;
    const returnId = location.state?.returnToEventId;
    const cardLink = returnId && mainRef.current?.querySelector(`a[href="/events/${returnId}"]`);
    (cardLink || headingRef.current)?.focus();
  }, [loadState, location.key]);

  return (
    <main ref={mainRef} id="events-main" className="events-main">
      <div className="events-title-row">
        <h1 ref={headingRef} tabIndex={-1}>Events</h1>
        <ViewSwitch selected={view} onSelect={onViewChange} />
      </div>
      <div className="field event-search">
        <label htmlFor="event-search">Search events</label>
        <input id="event-search" type="search" value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder="Search by title" />
      </div>
      {loadState === "loading" && (
        <p className="load-state" role="status">Loading events…</p>
      )}
      {loadState === "empty" && (
        <p className="empty-state">No events yet. When someone invites you, the event shows up here.</p>
      )}
      {loadState === "error" && (
        <div className="load-error" role="alert">
          <p>We couldn’t load the events. Check your connection and try again.</p>
          <button type="button" className="secondary-button" onClick={onRetry}>Try again</button>
        </div>
      )}
      {loadState === "ready" && (events.length > 0 ? (
        <EventList events={events} view={view} onStatusChange={onStatusChange} />
      ) : (
        <p className="empty-state" role="status">
          {query.trim() ? `No ${view} events match “${query}”. Try another title or clear the search.` : `No ${view} events yet.`}
        </p>
      ))}
    </main>
  );
}
