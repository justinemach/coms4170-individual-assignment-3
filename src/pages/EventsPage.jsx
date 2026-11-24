// Part 7: the Events page, which used to be the whole of App's <main>.
// It receives everything it needs from App as props.

import EventList from "../components/EventList.jsx";
import ViewSwitch from "../components/ViewSwitch.jsx";

export default function EventsPage(props) {
  const { events, view, onViewChange, onStatusChange } = props;

  return (
    <main id="events-main" className="events-main">
      <div className="events-title-row">
        <h1>Events</h1>
        <ViewSwitch selected={view} onSelect={onViewChange} />
      </div>
      <EventList events={events} view={view} onStatusChange={onStatusChange} />
    </main>
  );
}
