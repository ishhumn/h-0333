import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { getTestimonials, setTestimonials, type Testimonial } from "@/utils/localStorage";

const TestimonialsManagement = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonialsState] = useState(getTestimonials());
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = (testimonial: Testimonial) => {
    const updatedTestimonials = editingTestimonial
      ? testimonials.map(t => t.id === editingTestimonial.id ? testimonial : t)
      : [...testimonials, { ...testimonial, id: crypto.randomUUID(), date: new Date().toISOString() }];
    
    setTestimonials(updatedTestimonials);
    setTestimonialsState(updatedTestimonials);
    setIsDialogOpen(false);
    
    toast({
      title: editingTestimonial ? "Testimonial Updated" : "Testimonial Added",
      description: `The testimonial has been ${editingTestimonial ? 'updated' : 'added'} successfully.`,
    });
  };

  const handleDelete = (id: string) => {
    const updatedTestimonials = testimonials.filter(t => t.id !== id);
    setTestimonials(updatedTestimonials);
    setTestimonialsState(updatedTestimonials);
    
    toast({
      title: "Testimonial Deleted",
      description: "The testimonial has been deleted successfully.",
    });
  };

  return (
    <div className="glass-card rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Testimonials Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTestimonial(null)}>Add Testimonial</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
            </DialogHeader>
            <TestimonialForm
              initialTestimonial={editingTestimonial}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell>{testimonial.name}</TableCell>
                <TableCell>{testimonial.rating}/5</TableCell>
                <TableCell>{testimonial.message}</TableCell>
                <TableCell>{new Date(testimonial.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingTestimonial(testimonial);
                        setIsDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(testimonial.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const TestimonialForm = ({
  initialTestimonial,
  onSave,
  onCancel
}: {
  initialTestimonial: Testimonial | null;
  onSave: (testimonial: Testimonial) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(
    initialTestimonial || {
      id: '',
      name: '',
      rating: 5,
      message: '',
      date: new Date().toISOString()
    }
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        type="number"
        min="1"
        max="5"
        placeholder="Rating (1-5)"
        value={formData.rating}
        onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
      />
      <Input
        placeholder="Message"
        value={formData.message}
        onChange={e => setFormData({ ...formData, message: e.target.value })}
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(formData)}>Save</Button>
      </div>
    </div>
  );
};

export default TestimonialsManagement;