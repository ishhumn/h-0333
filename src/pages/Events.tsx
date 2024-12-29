import Header from "@/components/Header";
import EventTimeline from "@/components/events/EventTimeline";
import EventRegistrationForm from "@/components/events/EventRegistrationForm";
import { motion } from "framer-motion";

const Events = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1219] via-[#2A2830] to-[#161418]">
      <Header />
      <main className="pt-24 pb-16 container-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-neutral-400 text-transparent bg-clip-text">
              Upcoming Events
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
              Join our exciting events and stay updated with the latest in AI technology
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <EventTimeline />
            <EventRegistrationForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;