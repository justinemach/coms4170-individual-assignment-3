import EventList from "../components/EventList.jsx";

export default function MyEvents({ events, onStatusChange }) {
  // Each group is derived from App's shared events, never stored separately.
  const statuses = ["Going", "Invited", "Declined"];
  return (
    <main id="events-main" className="events-main">
      <div className="events-title-row"><h1>My Events</h1></div>
      {statuses.map((status) => {
        const matchingEvents = events.filter((event) => event.status === status);
        const groupId = "group-" + status.toLowerCase();
        return (
          <section className="my-events-group" key={status} aria-labelledby={groupId}>
            <h2 id={groupId}>{status}</h2>
            {matchingEvents.length === 0 ? (
              <p className="empty-state">Nothing here yet. Events you mark as {status.toLowerCase()} will show up here.</p>
            ) : (
              <EventList events={matchingEvents} view={status.toLowerCase()} onStatusChange={onStatusChange} />
            )}
          </section>
        );
      })}
    </main>
  );
}
