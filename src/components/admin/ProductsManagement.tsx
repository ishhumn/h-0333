import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { getProducts, setProducts, type Product } from "@/utils/localStorage";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import ProductRating from "./ProductRating";

const ProductsManagement = () => {
  const { toast } = useToast();
  const [products, setProductsState] = useState(getProducts());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

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
          <ProductTable
            products={products}
            onEdit={(product) => {
              setEditingProduct(product);
              setIsProductDialogOpen(true);
            }}
            onDelete={handleDeleteProduct}
          />
        </div>
      </div>

      {selectedProduct ? (
        <ProductRating product={selectedProduct} />
      ) : (
        <div className="text-center p-4 border rounded-lg">
          <p className="text-neutral-600">Select a product to rate it</p>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-4">Rate Products</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedProduct?.id === product.id ? 'border-primary' : ''
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-sm text-neutral-600">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsManagement;