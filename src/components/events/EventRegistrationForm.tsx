import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getEventRegistrations, setEventRegistrations } from "@/utils/localStorage";
import { EventRegistration } from "@/utils/localStorage";

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventName: "",
    numberOfTickets: "1",
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const registrations = getEventRegistrations();
    const newRegistration: EventRegistration = {
      id: crypto.randomUUID(),
      ...formData,
      date: new Date().toISOString(),
      status: "Pending" as const, // This fixes the type error
    };

    setEventRegistrations([...registrations, newRegistration]);

    toast({
      title: "Registration Successful!",
      description: "We'll contact you with further details soon.",
      className: "bg-accent text-white",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      eventName: "",
      numberOfTickets: "1",
    });
  };

  return (
    <Card className="p-6 bg-white/5 border-neutral-800">
      <h2 className="text-2xl font-semibold text-white mb-6">Register for Event</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-neutral-800 border-neutral-700 text-white"
          />
        </div>
        
        <div>
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="bg-neutral-800 border-neutral-700 text-white"
          />
        </div>
        
        <div>
          <Input
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="bg-neutral-800 border-neutral-700 text-white"
          />
        </div>
        
        <div>
          <Input
            placeholder="Event Name"
            value={formData.eventName}
            onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
            required
            className="bg-neutral-800 border-neutral-700 text-white"
          />
        </div>
        
        <div>
          <Input
            type="number"
            placeholder="Number of Tickets"
            min="1"
            value={formData.numberOfTickets}
            onChange={(e) => setFormData({ ...formData, numberOfTickets: e.target.value })}
            required
            className="bg-neutral-800 border-neutral-700 text-white"
          />
        </div>

        <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
          Register Now
        </Button>
      </form>
    </Card>
  );
};

export default EventRegistrationForm;
