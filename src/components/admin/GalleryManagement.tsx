import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { getGalleryItems, setGalleryItems, type GalleryItem } from "@/utils/localStorage";

const GalleryManagement = () => {
  const { toast } = useToast();
  const [items, setItemsState] = useState(getGalleryItems());
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = (item: GalleryItem) => {
    const updatedItems = editingItem
      ? items.map(i => i.id === editingItem.id ? item : i)
      : [...items, { ...item, id: crypto.randomUUID() }];
    
    setGalleryItems(updatedItems);
    setItemsState(updatedItems);
    setIsDialogOpen(false);
    
    toast({
      title: editingItem ? "Gallery Item Updated" : "Gallery Item Added",
      description: `The gallery item has been ${editingItem ? 'updated' : 'added'} successfully.`,
    });
  };

  const handleDelete = (id: string) => {
    const updatedItems = items.filter(i => i.id !== id);
    setGalleryItems(updatedItems);
    setItemsState(updatedItems);
    
    toast({
      title: "Gallery Item Deleted",
      description: "The gallery item has been deleted successfully.",
    });
  };

  return (
    <div className="glass-card rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Gallery Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}>Add Gallery Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}</DialogTitle>
            </DialogHeader>
            <GalleryForm
              initialItem={editingItem}
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
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingItem(item);
                        setIsDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
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

const GalleryForm = ({
  initialItem,
  onSave,
  onCancel
}: {
  initialItem: GalleryItem | null;
  onSave: (item: GalleryItem) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(
    initialItem || {
      id: '',
      title: '',
      image: ''
    }
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Title"
        value={formData.title}
        onChange={e => setFormData({ ...formData, title: e.target.value })}
      />
      <Input
        placeholder="Image URL"
        value={formData.image}
        onChange={e => setFormData({ ...formData, image: e.target.value })}
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(formData)}>Save</Button>
      </div>
    </div>
  );
};

export default GalleryManagement;