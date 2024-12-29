import { getEvents } from "@/utils/localStorage";
import { Calendar } from "lucide-react";

const EventTimeline = () => {
  const events = getEvents();

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-white mb-8">Event Timeline</h2>
      <div className="relative space-y-8">
        {events.map((event, index) => (
          <div key={event.id} className="relative pl-8 pb-8">
            <div className="absolute left-0 top-0 h-full w-px bg-accent/30" />
            <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-accent" />
            
            <div className="glass-card p-6 rounded-xl bg-white/5">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-accent" />
                <span className="text-accent">{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
              <p className="text-neutral-300">{event.description}</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="text-sm text-neutral-400">Location: {event.location}</span>
                <span className="text-sm text-neutral-400">Time: {event.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventTimeline;