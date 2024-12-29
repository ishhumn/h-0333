import { getEvents } from "@/utils/localStorage";
import { Calendar, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

const EventTimeline = () => {
  const events = getEvents();

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-white mb-8">Upcoming Events</h2>
      <div className="relative space-y-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative pl-8 pb-8"
          >
            <div className="absolute left-0 top-0 h-full w-px bg-accent/30" />
            <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-accent" />
            
            <div className="glass-card p-6 rounded-xl bg-white/5">
              <div className="grid md:grid-cols-[2fr,1fr] gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span className="text-accent">{new Date(event.date).toLocaleDateString()}</span>
                    <Clock className="w-5 h-5 text-accent ml-4" />
                    <span className="text-accent">{event.time}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-neutral-300 mb-4">{event.description}</p>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${index === 0 ? '1649972904349-6e44c42644a7' : 
                         index === 1 ? '1488590528505-98d2b5aba04b' : 
                         '1518770660439-4636190af475'}`}
                    alt={event.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventTimeline;