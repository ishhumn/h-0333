import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { getProducts, setProducts, type Product } from "@/utils/localStorage";

const ProductsManagement = () => {
  const { toast } = useToast();
  const [products, setProductsState] = useState(getProducts());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = (product: Product) => {
    const updatedProducts = editingProduct
      ? products.map(p => p.id === editingProduct.id ? product : p)
      : [...products, { ...product, id: crypto.randomUUID() }];
    
    setProducts(updatedProducts);
    setProductsState(updatedProducts);
    setIsDialogOpen(false);
    
    toast({
      title: editingProduct ? "Product Updated" : "Product Added",
      description: `The product has been ${editingProduct ? 'updated' : 'added'} successfully.`,
    });
  };

  const handleDelete = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    setProductsState(updatedProducts);
    
    toast({
      title: "Product Deleted",
      description: "The product has been deleted successfully.",
    });
  };

  return (
    <div className="glass-card rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <ProductForm
              initialProduct={editingProduct}
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
                        setIsDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
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

export default ProductsManagement;