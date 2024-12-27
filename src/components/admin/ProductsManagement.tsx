import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { getProducts, setProducts, type Product, getTestimonials, setTestimonials, type Testimonial } from "@/utils/localStorage";

const ProductsManagement = () => {
  const { toast } = useToast();
  const [products, setProductsState] = useState(getProducts());
  const [testimonials, setTestimonialsState] = useState(getTestimonials());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false);

  const handleSaveProduct = (product: Product) => {
    const updatedProducts = editingProduct
      ? products.map(p => p.id === editingProduct.id ? product : p)
      : [...products, { ...product, id: crypto.randomUUID() }];
    
    setProducts(updatedProducts);
    setProductsState(updatedProducts);
    setIsProductDialogOpen(false);
    
    toast({
      title: editingProduct ? "Product Updated" : "Product Added",
      description: `The product has been ${editingProduct ? 'updated' : 'added'} successfully.`,
    });
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    setProductsState(updatedProducts);
    
    toast({
      title: "Product Deleted",
      description: "The product has been deleted successfully.",
    });
  };

  const handleSaveTestimonial = (testimonial: Testimonial) => {
    const updatedTestimonials = editingTestimonial
      ? testimonials.map(t => t.id === editingTestimonial.id ? testimonial : t)
      : [...testimonials, { ...testimonial, id: crypto.randomUUID(), date: new Date().toISOString() }];
    
    setTestimonials(updatedTestimonials);
    setTestimonialsState(updatedTestimonials);
    setIsTestimonialDialogOpen(false);
    
    toast({
      title: editingTestimonial ? "Testimonial Updated" : "Testimonial Added",
      description: `The testimonial has been ${editingTestimonial ? 'updated' : 'added'} successfully.`,
    });
  };

  const handleDeleteTestimonial = (id: string) => {
    const updatedTestimonials = testimonials.filter(t => t.id !== id);
    setTestimonials(updatedTestimonials);
    setTestimonialsState(updatedTestimonials);
    
    toast({
      title: "Testimonial Deleted",
      description: "The testimonial has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="glass-card rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Products Management</h2>
          <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingProduct(null)}>Add Product</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              </DialogHeader>
              <ProductForm
                initialProduct={editingProduct}
                onSave={handleSaveProduct}
                onCancel={() => setIsProductDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingProduct(product);
                          setIsProductDialogOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteProduct(product.id)}
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

      {/* Testimonials Section */}
      <div className="glass-card rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Testimonials Management</h2>
          <Dialog open={isTestimonialDialogOpen} onOpenChange={setIsTestimonialDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingTestimonial(null)}>Add Testimonial</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
              </DialogHeader>
              <TestimonialForm
                initialTestimonial={editingTestimonial}
                onSave={handleSaveTestimonial}
                onCancel={() => setIsTestimonialDialogOpen(false)}
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
                          setIsTestimonialDialogOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
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
    </div>
  );
};

const ProductForm = ({
  initialProduct,
  onSave,
  onCancel
}: {
  initialProduct: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(
    initialProduct || {
      id: '',
      name: '',
      description: '',
      price: 0,
      image: ''
    }
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Product Name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        placeholder="Description"
        value={formData.description}
        onChange={e => setFormData({ ...formData, description: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
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

export default ProductsManagement;