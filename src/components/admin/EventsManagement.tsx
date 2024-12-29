import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { getEvents, setEvents, getEventRegistrations, setEventRegistrations, EventRegistration } from "@/utils/localStorage";

const EventsManagement = () => {
  const [events, setEventsState] = useState(getEvents());
  const [registrations, setRegistrationsState] = useState(getEventRegistrations());
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const { toast } = useToast();

  const handleAddEvent = () => {
    const newEvent = {
      id: crypto.randomUUID(),
      ...eventForm,
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setEventsState(updatedEvents);
    setIsAddingEvent(false);
    setEventForm({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
    });

    toast({
      title: "Event Added",
      description: "The event has been successfully added to the timeline.",
      className: "bg-accent text-white",
    });
  };

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setEventForm(event);
  };

  const handleUpdateEvent = () => {
    const updatedEvents = events.map((event) =>
      event.id === editingEvent.id ? { ...event, ...eventForm } : event
    );
    setEvents(updatedEvents);
    setEventsState(updatedEvents);
    setEditingEvent(null);
    setEventForm({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
    });

    toast({
      title: "Event Updated",
      description: "The event has been successfully updated.",
      className: "bg-accent text-white",
    });
  };

  const handleDeleteEvent = (id: string) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    setEventsState(updatedEvents);

    toast({
      title: "Event Deleted",
      description: "The event has been successfully removed.",
      variant: "destructive",
    });
  };

  const handleUpdateRegistrationStatus = (id: string, status: "Pending" | "Confirmed" | "Cancelled") => {
    const updatedRegistrations = registrations.map((reg) =>
      reg.id === id ? { ...reg, status } : reg
    );
    setEventRegistrations(updatedRegistrations);
    setRegistrationsState(updatedRegistrations);

    toast({
      title: "Status Updated",
      description: "The registration status has been updated.",
      className: "bg-accent text-white",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Events Management</h2>
        <Button onClick={() => setIsAddingEvent(true)} className="bg-accent hover:bg-accent/90">
          Add New Event
        </Button>
      </div>

      {(isAddingEvent || editingEvent) && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingEvent ? "Edit Event" : "Add New Event"}
          </h3>
          <div className="space-y-4">
            <Input
              placeholder="Event Title"
              value={eventForm.title}
              onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                value={eventForm.date}
                onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
              />
              <Input
                type="time"
                value={eventForm.time}
                onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
              />
            </div>
            <Input
              placeholder="Location"
              value={eventForm.location}
              onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
            />
            <Textarea
              placeholder="Event Description"
              value={eventForm.description}
              onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingEvent(false);
                  setEditingEvent(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-accent hover:bg-accent/90"
                onClick={editingEvent ? handleUpdateEvent : handleAddEvent}
              >
                {editingEvent ? "Update Event" : "Add Event"}
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Events Timeline</h3>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="text-sm text-neutral-400">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-semibold">{event.title}</h4>
                  <p className="text-sm text-neutral-400">{event.location}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditEvent(event)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Event Registrations</h3>
          <div className="space-y-4">
            {registrations.map((registration) => (
              <div key={registration.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{registration.name}</h4>
                    <p className="text-sm text-neutral-400">{registration.eventName}</p>
                  </div>
                  <select
                    value={registration.status}
                    onChange={(e) => handleUpdateRegistrationStatus(
                      registration.id,
                      e.target.value as "Pending" | "Confirmed" | "Cancelled"
                    )}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="text-sm text-neutral-400">
                  <p>Email: {registration.email}</p>
                  <p>Phone: {registration.phone}</p>
                  <p>Tickets: {registration.numberOfTickets}</p>
                  <p>Date: {new Date(registration.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EventsManagement;
